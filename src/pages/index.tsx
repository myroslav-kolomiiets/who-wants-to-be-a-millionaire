import * as React from 'react';
import Image from 'next/image';
import Control, {
  controlThemes,
  controlSizes
} from '../components/Control/Control';

export default function Home() {
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
            objectFit: 'contain'
          }}
        />
      </div>
      <div className="homepage__link">
        <div className="homepage__link-wrapper">
          <h1 className="homepage__link-h1">
            Who wants to be
            <br />a millionaire?
          </h1>
          <Control
            theme={controlThemes.primary}
            size={controlSizes.medium}
            text="Start"
            href="/game"
            isNavigation
          />
        </div>
      </div>
    </main>
  );
}
