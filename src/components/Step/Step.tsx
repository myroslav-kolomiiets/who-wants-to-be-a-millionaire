import * as React from 'react';
import classnames from 'classnames';
import styles from './style.module.scss';

interface IStep {
  theme: string;
  isCurrent: boolean;
  isPassed: boolean;
  question: {
    cost: number;
  };
}

export const stepThemes = {
  grey: 'grey',
  orange: 'orange',
  black: 'black'
};

const Step: React.FC<IStep> = ({ theme, isCurrent, isPassed, question }) => {
  const classNames = classnames(styles.step, {
    [styles[`step--theme--${theme}`]]: theme,
    [styles['is-current']]: isCurrent,
    [styles['is-passed']]: isPassed
  });

  const formattedWinAmount = new Intl.NumberFormat().format(question.cost);

  return (
    <div className={classNames}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 376 40"
        // viewBox="0 0 320 32"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M69 20H0" />
        <path d="M376 20H307" />
        <path d="M81.4526 4.63788C83.6376 2.01596 86.8742 0.5 90.2872 0.5H285.713C289.126 0.5 292.362 2.01597 294.547 4.63788L307.349 20L294.547 35.3621C292.362 37.984 289.126 39.5 285.713 39.5H90.2872C86.8742 39.5 83.6376 37.984 81.4526 35.3621L68.6509 20L81.4526 4.63788Z" />
        <text
          dominantBaseline="middle"
          textAnchor="middle"
          id="textid"
          x="50%"
          y="55%"
        >
          {`$${formattedWinAmount}`}
        </text>
      </svg>
    </div>
  );
};

export default Step;
