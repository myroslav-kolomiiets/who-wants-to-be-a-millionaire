import Image from 'next/image';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import Control, {
  controlThemes,
  controlSizes,
} from '../components/Control/Control';

export default function Home() {
  const router = useRouter();
  const { earned } = router.query;

  const earnedAmount: number = typeof earned === 'string' ? parseInt(earned, 10) || 0 : 0;
  const formattedEarnedAmount = new Intl.NumberFormat().format(earnedAmount);

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
            <h3 className="homepage__link-h3">{`$${formattedEarnedAmount} earned`}</h3>
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
            theme={controlThemes.primary}
            size={controlSizes.responsive}
            text={earned ? 'Try again' : 'Start'}
            href="/game"
            isNavigation
          />
        </div>
      </div>
    </main>
  );
}
