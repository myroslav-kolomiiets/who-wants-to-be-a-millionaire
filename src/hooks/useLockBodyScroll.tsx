import { useRef, useEffect } from 'react';

export const useLockBodyScroll = (toggle: boolean) => {
  const position = useRef(window.scrollY);
  const bodyStyles = document.body.style;

  useEffect(() => {
    if (toggle) {
      position.current = window.scrollY;
    }
    bodyStyles.top = toggle ? `-${position.current}px` : '';
    bodyStyles.height = toggle ? '100vh' : '';
    bodyStyles.position = toggle ? 'fixed' : '';
    window.scrollTo(0, position.current);
  }, [bodyStyles, toggle]);
};
