import { ControlThemes, ControlSizes } from './controlProps';

interface IControl {
  theme: ControlThemes;
  size?: ControlSizes;
  marker?: string;
  isCorrect?: boolean;
  isWrong?: boolean;
  isNavigation?: boolean;
  isDisabled?: boolean;
  href?: string;
  text: string;
  onClick?: () => void;
}

export default IControl;
