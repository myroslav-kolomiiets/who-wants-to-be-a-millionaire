import { ControlThemes, ControlSizes } from './controlProps';

export interface IControl {
  theme: ControlThemes;
  size?: ControlSizes;
  marker?: string;
  isCorrect?: boolean;
  isWrong?: boolean;
  isRemoved?: boolean;
  isNavigation?: boolean;
  isHelpOption?: boolean;
  isDisabled?: boolean;
  href?: string;
  text: string;
  onClick?: () => void;
}
