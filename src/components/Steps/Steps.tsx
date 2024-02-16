import { useState } from 'react';
import classnames from 'classnames';
import { isDesktop, isMobile } from 'react-device-detect';
import Step, { stepThemes } from '../Step/Step';
import BurgerMenuButton from '../BurgerMenuButton/BurgerMenuButton';
import styles from './style.module.scss';

interface ISteps {
  costs: Array<number>;
  step: number;
}

function Steps(props: ISteps) {
  const { costs, step } = props;

  const [active, setActive] = useState(false);

  return (
    <>
      {isMobile && <BurgerMenuButton active={active} setActive={setActive} />}
      <div
        className={classnames(styles.steps, {
          [styles.active]: active,
        })}
      >
        <div className={classnames(styles.steps__wrapper)}>
          {(isDesktop || active)
            && costs
              .map((cost: number, index: number) => {
                let theme;
                if (step === index) {
                  theme = stepThemes.orange;
                } else if (index < step) {
                  theme = stepThemes.grey;
                } else {
                  theme = stepThemes.black;
                }
                return <Step key={cost} cost={cost} theme={theme} />;
              })
              .reverse()}
        </div>
      </div>
    </>
  );
}

export default Steps;
