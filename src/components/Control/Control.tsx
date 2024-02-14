import * as React from 'react';
import classnames from 'classnames';
import styles from './style.module.scss';
import Link from 'next/link';

interface IControl {
  theme?: string;
  size?: string;
  marker?: string;
  isSelected?: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  isActive?: boolean;
  isPressed?: boolean;
  isNavigation?: boolean;
  href?: string;
  text?: string;
  onClick?: () => void;
}

export const controlThemes = {
  hexagonal: 'hexagonal',
  primary: 'primary'
};

export const controlStates = {
  isCorrect: 'isCorrect',
  isWrong: 'isWrong'
};

export const controlSizes = {
  small: 'small',
  medium: 'medium'
};

const Control: React.FC<IControl> = ({
  theme,
  size,
  marker,
  isCorrect,
  isWrong,
  isNavigation,
  text,
  onClick,
  href
}) => {
  const classNames = classnames(styles.control, {
    [styles[`control--size--${size}`]]: size,
    [styles[`control--theme--${theme}`]]: theme,
    [styles['is-correct']]: isCorrect,
    [styles['is-wrong']]: isWrong
  });

  if (isNavigation) {
    return (
      <Link href={href !== undefined ? href : '/'} className={classNames}>
        {text}
      </Link>
    );
  }

  return (
    <button className={classNames} onClick={onClick}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 421 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M404 36L421 36" />
        <path d="M0 36L17 36" />
        <path
          fill="#fff"
          d="M39.8137 5.09773C41.9857 2.2033 45.3933 0.5 49.012 0.5H371.988C375.607 0.5 379.014 2.2033 381.186 5.09773L404.375 36L381.186 66.9023C379.014 69.7967 375.607 71.5 371.988 71.5H49.012C45.3933 71.5 41.9857 69.7967 39.8137 66.9023L16.6251 36L39.8137 5.09773Z"
        />
        <text x="50" y="45" fill="#FF8B37" stroke="none">
          {marker}
        </text>
        <text x="70" y="45" fill="#1C1C21" stroke="none">
          {text}
        </text>
      </svg>
    </button>
  );
};

export default Control;
