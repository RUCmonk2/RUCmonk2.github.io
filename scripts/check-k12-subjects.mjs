import assert from "node:assert/strict";

import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);
const {
  schoolDirectory,
  schoolSubjects,
  schoolStages,
  subjectGroups,
  schoolProjects,
  subjectModuleCount,
  subjectHref,
  moduleHref,
} = await jiti.import("../src/data/k12-subjects/index.ts");
const { k12Topics } = await jiti.import("../src/data/k12/index.ts");
const { learningCatalog } = await jiti.import(
  "../src/data/learning/catalog.ts",
);
const ids = new Set(schoolDirectory.map((s) => s.id));
assert.equal(ids.size, schoolDirectory.length, "Unique subject IDs required");
assert.equal(schoolDirectory.length, 16);
assert.equal(schoolSubjects.length, 15);
assert.equal(subjectModuleCount, 122);
const anchors = new Set();
for (const subject of schoolSubjects) {
  assert.match(subject.id, /^[a-z]+(?:-[a-z]+)*$/);
  assert(subjectGroups.some((group) => group.id === subject.group));
  assert(subject.intro && subject.method && subject.note);
  assert(subject.connections.length >= 2);
  for (const related of subject.connections)
    assert(
      ids.has(related) && related !== subject.id,
      `${subject.id}: invalid related subject ${related}`,
    );
  assert.equal(
    new Set(subject.stages.map((s) => s.id)).size,
    subject.stages.length,
  );
  for (const stage of subject.stages) {
    assert(schoolStages.some((s) => s.id === stage.id));
    assert(stage.goal && stage.entry);
    assert(stage.modules.length >= 3);
    for (const module of stage.modules) {
      const href = moduleHref(subject.id, stage.id, module.id);
      assert(!anchors.has(href), `Duplicate module anchor: ${href}`);
      anchors.add(href);
      assert(module.topics.length >= 4, `${href}: incomplete knowledge range`);
      assert.equal(new Set(module.topics).size, module.topics.length);
      for (const field of ["task", "check", "mistake"]) {
        assert(
          module[field].trim().length > 0,
          `${href}: missing substantive ${field}`,
        );
        assert(!/TODO|待补充|暂无内容/.test(module[field]), href);
      }
    }
  }
}
// Exclude early-years standalone physics/history; retain integrated science's
// middle-school track and the high-school-only technology subject.
for (const id of ["physics", "chemistry", "biology", "history", "geography"]) {
  assert.deepEqual(
    schoolSubjects.find((s) => s.id === id).stages.map((s) => s.id),
    ["middle", "high"],
  );
}
assert.deepEqual(
  schoolSubjects.find((s) => s.id === "technology").stages.map((s) => s.id),
  ["high"],
);
assert.deepEqual(
  schoolSubjects.find((s) => s.id === "science").stages.map((s) => s.id),
  ["primary", "middle"],
);
const math = schoolDirectory.find((s) => s.id === "mathematics");
assert.equal(math.stages.flatMap((s) => s.modules).length, k12Topics.length);
for (const topic of k12Topics)
  assert.equal(
    moduleHref("mathematics", topic.stage, topic.id),
    `/learning/k12/lesson/${topic.id}`,
  );
assert.equal(learningCatalog.find((s) => s.id === "k12").href, "/learning/k12");
assert.equal(
  learningCatalog.find((s) => s.id === "k12-mathematics").href,
  subjectHref("mathematics"),
);
assert.equal(
  new Set(schoolProjects.map((p) => p.id)).size,
  schoolProjects.length,
);
for (const project of schoolProjects) {
  assert(project.subjects.length >= 3 && project.steps.length >= 3);
  for (const id of project.subjects) assert(ids.has(id), project.id);
  assert(project.question && project.result);
}
console.log(
  `K12 subjects verified: ${ids.size} entries, ${schoolSubjects.reduce((n, s) => n + s.stages.length, 0)} stage frameworks, ${anchors.size} modules, ${schoolProjects.length} projects; ${k12Topics.length} mathematics lesson links retained.`,
);
