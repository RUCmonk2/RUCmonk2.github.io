export type StudyFigure = { src: string; alt: string; caption: string };
export type StudyFormula = {
  id: string;
  title: string;
  formula: string;
  context: string;
  task: string;
  hint: string;
  derivation: string;
  pitfall: string;
  source: string;
  figure?: StudyFigure;
};
export type StudyExercise = {
  id: string;
  title: string;
  prompt: string;
  hint: string;
  answer: string;
  solution: string;
  source: string;
  minutes: number;
  figure?: StudyFigure;
};
export type StudySet = {
  formulas: StudyFormula[];
  exercises: StudyExercise[];
  figures?: StudyFigure[];
};
