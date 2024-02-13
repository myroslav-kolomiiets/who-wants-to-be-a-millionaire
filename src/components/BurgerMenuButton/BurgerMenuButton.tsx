import * as React from 'react';
import classnames from 'classnames';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import styles from './style.module.scss';
interface IBurgerMenuButton {
  active: boolean;
  setActive: (active: boolean) => void;
}

const BurgerMenuButton: React.FC<IBurgerMenuButton> = ({
  active,
  setActive
}) => {
  useLockBodyScroll(active);

  return (
    <div
      className={classnames(styles['menu-button'], {
        [styles['active']]: active
      })}
      onClick={() => setActive(!active)}
    >
      <span className={classnames(styles['menu-button__bar'])}></span>
      <span className={classnames(styles['menu-button__bar'])}></span>
      <span className={classnames(styles['menu-button__bar'])}></span>
    </div>
  );
};

export default BurgerMenuButton;
