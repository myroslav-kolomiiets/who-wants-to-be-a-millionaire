export interface IOption {
  marker: string;
  content: string;
  isCorrect: boolean;
}

export interface IQuestion {
  length: number;
  question: string;
  options: Array<IOption>;
  cost: number;
}

export interface IStaticData {
  nextStepDelay: number;
  questions: Array<IQuestion>;
}
