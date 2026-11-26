import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const sourceDir = fileURLToPath(
  new URL("../public/assets/lean-lab/", import.meta.url),
);
const output = new URL("../src/data/lean-lab/replays.json", import.meta.url);
const toolchain = (
  await readFile(path.join(sourceDir, "lean-toolchain"), "utf8")
).trim();
const files = (await readdir(sourceDir))
  .filter((file) => file.endsWith(".lean"))
  .sort();
const sources = Object.fromEntries(
  await Promise.all(
    files.map(async (file) => [
      file,
      (await readFile(path.join(sourceDir, file), "utf8")).replaceAll(
        "\r\n",
        "\n",
      ),
    ]),
  ),
);
const hashes = Object.fromEntries(
  files.map((file) => [
    file,
    createHash("sha256").update(sources[file]).digest("hex"),
  ]),
);

if (process.argv.includes("--check")) {
  const replay = JSON.parse(await readFile(output, "utf8"));
  assert.deepEqual(
    replay.toolchain,
    toolchain,
    "Lean toolchain changed. Regenerate the replays.",
  );
  assert.deepEqual(
    replay.hashes,
    hashes,
    "Lean source changed. Run npm run verify:lean-lab.",
  );
  console.log("Lean lab replays match the source files.");
  process.exit(0);
}

const lean = process.env.LEAN ?? "lean";
const versionResult = spawnSync(lean, ["--version"], {
  cwd: sourceDir,
  encoding: "utf8",
});
if (versionResult.error) throw versionResult.error;
assert.equal(versionResult.status, 0, versionResult.stderr);
const version = versionResult.stdout.match(/Lean \(version ([^, )]+)/)?.[1];
assert.equal(
  "leanprover/lean4:v" + version,
  toolchain,
  "Use the pinned Lean version.",
);

const lessons = {};
const samples = {};
const allowedAxioms = new Set(["propext", "Classical.choice", "Quot.sound"]);
const work = await mkdtemp(path.join(tmpdir(), "lean-lab-"));

try {
  for (const file of files) {
    let lesson;
    const points = [];
    const lines = sources[file].split("\n");
    const runLines = lines.map((line, index) => {
      const start = line.match(/^-- @lesson ([a-z0-9-]+)$/);
      if (start) {
        assert(
          !lesson && !lessons[start[1]],
          `${file}:${index + 1}: duplicate lesson`,
        );
        lesson = { file, lineNumbers: [], code: [], steps: [] };
        lessons[start[1]] = lesson;
        return line;
      }
      if (line === "-- @end") {
        assert(lesson?.steps.length, `${file}:${index + 1}: empty lesson`);
        lesson = undefined;
        return line;
      }

      const step = line.match(/^( +)-- @step ([a-z0-9-]+)$/);
      if (step) {
        assert(
          lesson?.code.length,
          `${file}:${index + 1}: step outside a lesson`,
        );
        assert(
          !lesson.steps.some(({ id }) => id === step[2]),
          `Duplicate step ${step[2]}`,
        );
        const previous = lesson.steps.at(-1)?.through ?? 0;
        const frame = {
          id: step[2],
          from: previous + 1,
          through: lesson.code.length,
        };
        assert(frame.from <= frame.through, `Step ${step[2]} has no code`);
        lesson.steps.push(frame);
        points.push({ frame, line: index + 1 });
        return step[1] + "trace_state";
      }

      const sample = line.match(/^-- @sample ([a-z0-9-]+)$/);
      if (sample) {
        const input = lines[index + 1]?.match(
          /^#eval insertionTrace (\[.*\])$/,
        )?.[1];
        assert(
          input,
          `${file}:${index + 1}: sample must evaluate an insertion trace`,
        );
        points.push({
          sample: sample[1],
          input: JSON.parse(input),
          line: index + 2,
        });
      }
      if (lesson) {
        lesson.code.push(line);
        lesson.lineNumbers.push(index + 1);
      }
      return line;
    });
    assert(!lesson, `${file}: missing -- @end`);
    assert(
      !/\b(sorry|admit|axiom)\b/.test(
        lines.filter((line) => !line.trim().startsWith("--")).join("\n"),
      ),
      `${file}: unfinished proof or custom axiom`,
    );

    const runFile = path.join(work, file);
    await writeFile(runFile, runLines.join("\n"));
    const result = spawnSync(lean, ["--json", runFile], {
      cwd: sourceDir,
      encoding: "utf8",
      maxBuffer: 4 * 1024 * 1024,
    });
    if (result.error) throw result.error;
    const messages = result.stdout
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line));
    assert.equal(
      result.status,
      0,
      result.stderr +
        messages
          .filter(({ severity }) => severity !== "information")
          .map(({ pos, data }) => `${file}:${pos.line}: ${data}`)
          .join("\n"),
    );
    const seen = new Set();
    let axiomChecks = 0;
    for (const { pos, severity, data, kind } of messages) {
      assert.equal(severity, "information", data);
      const point = points.find((entry) => entry.line === pos.line);
      if (point) {
        assert(
          !seen.has(point.line),
          `${file}:${point.line}: multiple diagnostics`,
        );
        seen.add(point.line);
        if (point.frame) {
          assert.equal(
            kind,
            "trace",
            `${file}:${point.line}: expected trace_state output`,
          );
          point.frame.state = data.trim() || "no goals";
        } else {
          const prefixes = JSON.parse(data);
          assert.deepEqual(
            prefixes.map((prefix) => prefix.length),
            [0, ...point.input.map((_, index) => index + 1)],
          );
          samples[point.sample] = { input: point.input, prefixes };
        }
        continue;
      }

      const axioms = data
        .match(/depends on axioms: \[([^\]]*)\]/u)?.[1]
        ?.split(", ");
      assert(
        data.includes("does not depend on any axioms") ||
          axioms?.every((axiom) => allowedAxioms.has(axiom)),
        `${file}:${pos.line}: unexpected diagnostic ${data}`,
      );
      axiomChecks++;
    }
    assert(axiomChecks > 0, `${file}: no axiom audit`);
    assert.equal(
      seen.size,
      points.length,
      `${file}: missing Lean output at ${points
        .filter((point) => !seen.has(point.line))
        .map(({ line }) => line)
        .join(", ")}`,
    );
  }

  for (const [id, lesson] of Object.entries(lessons)) {
    assert(
      lesson.steps.every(({ state }) => state),
      `${id}: empty Lean state`,
    );
    assert.equal(
      lesson.steps.at(-1).state,
      "no goals",
      `${id}: final state must close the proof`,
    );
  }
  await writeFile(
    output,
    JSON.stringify({ toolchain, hashes, lessons, samples }, null, 2) + "\n",
  );
  console.log(
    `Lean ${version} checked ${files.length} source files and captured ${Object.keys(lessons).length} proof replays.`,
  );
} finally {
  await rm(work, { recursive: true, force: true });
}
