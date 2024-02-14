import * as React from 'react';
import classnames from 'classnames';
import { isDesktop, isMobile } from 'react-device-detect';
import Step, { stepThemes } from '../../components/Step/Step';
import BurgerMenuButton from '../../components/BurgerMenuButton/BurgerMenuButton';
import styles from './style.module.scss';

interface ISteps {
  costs: Array<number>;
  step: number;
}

const Steps: React.FC<ISteps> = ({ costs, step }) => {
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
            costs
              .map((cost: number, index: number) => {
                const theme =
                  index < step
                    ? stepThemes.grey
                    : step === index
                      ? stepThemes.orange
                      : stepThemes.black;
                return <Step key={index} cost={cost} theme={theme} />;
              })
              .reverse()}
        </div>
      </div>
    </>
  );
};

export default Steps;
