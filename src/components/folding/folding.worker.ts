import {
  CURRENT_PUZZLE_VERSION,
  findHint,
  generatePuzzle,
  getGeometry,
  type PuzzleConfig,
  type PuzzleVersion,
} from "../../lib/math-lab/folding";

type Request =
  | {
      id: number;
      kind: "generate";
      config: PuzzleConfig;
      version?: PuzzleVersion;
    }
  | {
      id: number;
      kind: "hint";
      config: PuzzleConfig;
      board: number[];
      target: number[];
    };

self.onmessage = ({ data }: MessageEvent<Request>) => {
  try {
    const result =
      data.kind === "generate"
        ? generatePuzzle(data.config, data.version ?? CURRENT_PUZZLE_VERSION)
        : findHint(
            getGeometry(data.config.shape, data.config.size),
            data.board,
            data.target,
            3,
            12000,
          );
    self.postMessage({ id: data.id, kind: data.kind, result });
  } catch (error) {
    self.postMessage({
      id: data.id,
      kind: data.kind,
      error: error instanceof Error ? error.message : "暂时无法生成题目",
    });
  }
};
