import * as React from 'react';
import classnames from 'classnames';
import { isDesktop, isMobile } from 'react-device-detect';
import Step, { stepThemes } from '@/components/Step/Step';
import BurgerMenuButton from '@/components/BurgerMenuButton/BurgerMenuButton';
import styles from './style.module.scss';

interface ISteps {
  questions: [];
  step: number;
}

const Steps: React.FC<ISteps> = ({ questions, step }) => {
  const [active, setActive] = React.useState(false);

  return (
    <>
      {isMobile && <BurgerMenuButton active={active} setActive={setActive} />}
      <div
        className={classnames(styles.steps, {
          [styles['active']]: active
        })}
      >
        <div className={classnames(styles['steps__wrapper'])}>
          {(isDesktop || active) &&
            questions
              .map((question: string, index: number) => {
                const theme:
                  | stepThemes.grey
                  | stepThemes.orange
                  | stepThemes.black =
                  index < step
                    ? stepThemes.grey
                    : step === index
                      ? stepThemes.orange
                      : stepThemes.black;
                return <Step key={index} question={question} theme={theme} />;
              })
              .reverse()}
        </div>
      </div>
    </>
  );
};

export default Steps;
