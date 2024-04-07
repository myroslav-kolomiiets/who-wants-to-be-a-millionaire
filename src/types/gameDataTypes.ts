export interface IGameState {
  earned: number;
  currentStep: number;
  fiftyFiftyUsedOnStep: boolean;
  disabledHelpOption: boolean;
}

export interface IOption {
  marker: string;
  content: string;
  isCorrect: boolean;
  isRemovable: boolean;
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
