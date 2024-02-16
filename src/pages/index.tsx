import Image from 'next/image';
import { useRouter } from 'next/router';
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
    <main className="homepage">
      <div className="homepage__image">
        <Image
          priority
          src="/images/logo.svg"
          width={624}
          height={367}
          alt="logo"
          style={{
            objectFit: 'contain',
          }}
        />
      </div>
      <div className="homepage__link">
        <div className="homepage__link-wrapper">
          {earned ? (
            <div>
              <h2 className="homepage__link-h2">Total score:</h2>
              <h3 className="homepage__link-h3">{`$${formattedEarnedAmount} earned`}</h3>
            </div>
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
      </div>
    </main>
  );
}
