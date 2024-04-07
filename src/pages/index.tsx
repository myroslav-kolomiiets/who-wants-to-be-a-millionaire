import Image from 'next/image';
import classnames from 'classnames';
import Control from '../components/Control/Control';
import {
  ControlThemes,
  ControlSizes,
} from '../components/Control/controlProps';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { gameSlice } from '../store/GameSlice';

export default function Home() {
  const dispatch = useAppDispatch();

  const { earned } = useAppSelector((state) => state.gameReducer);
  const { setEarned, setCurrentStep, setFiftyFiftyUsedOnStep, setDisabledHelpOption } = gameSlice.actions;

  const formattedEarned = new Intl.NumberFormat().format(earned);

  const handleOnStartClick = () => {
    dispatch(setCurrentStep(0));
    dispatch(setEarned(0));
    dispatch(setFiftyFiftyUsedOnStep(false));
    dispatch(setDisabledHelpOption(false));
  };

  return (
    <main className={classnames('homepage', { final: earned })}>
      <div className="homepage__image">
        <Image
          priority
          src="/images/logo.svg"
          sizes="50vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
          width={500}
          height={300}
          alt="logo"
        />
      </div>
      <div className="homepage__link">
        {earned ? (
          <>
            <h2 className="homepage__link-h2">Total score:</h2>
            <h3 className="homepage__link-h3">{`$${formattedEarned} earned`}</h3>
          </>
        )
          : (
            <h1 className="homepage__link-h1">
              Who wants to be
              <br />
              a millionaire?
            </h1>
          )}

        <div className="homepage__link-button">
          <Control
            theme={ControlThemes.Primary}
            size={ControlSizes.Responsive}
            text={earned ? 'Try again' : 'Start'}
            onClick={() => handleOnStartClick()}
            href="/game"
            isNavigation
          />
        </div>
      </div>
    </main>
  );
}
