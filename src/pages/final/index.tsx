import * as React from 'react';
import Control, {
  controlThemes,
  controlSizes
} from '@/components/Control/Control';
import Image from 'next/image';
import { useRouter } from 'next/router';
import logo from '../../../public/images/logo.svg';

export default function Final() {
  const router = useRouter();
  const { earned } = router.query;

  const earnedAmount: number =
    typeof earned === 'string' ? parseInt(earned, 10) || 0 : 0;
  const formatedEarnedAmount = new Intl.NumberFormat().format(earnedAmount);

  return (
    <main className="final-block">
      <Image
        priority
        src={logo}
        alt="logo"
        style={{
          objectFit: 'contain'
        }}
      />
      <div>
        <h2 className="final-block__h2">Total score:</h2>
        <h3 className="final-block__h3">{`$${formatedEarnedAmount} earned`}</h3>
        <Control
          theme={controlThemes.primary}
          size={controlSizes.medium}
          text="Try again"
          href="/game"
          isNavigation
        />
      </div>
    </main>
  );
}
