import classnames from 'classnames';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import styles from './style.module.scss';

interface IBurgerMenuButton {
  active: boolean;
  setActive: (active: boolean) => void;
}
function BurgerMenuButton(props: IBurgerMenuButton) {
  const { active, setActive } = props;

  useLockBodyScroll(active);

  return (
    <button
      type="button"
      className={classnames(styles['menu-button'], {
        [styles.active]: active,
      })}
      onClick={() => setActive(!active)}
    >
      <span className={classnames(styles['menu-button__bar'])} />
      <span className={classnames(styles['menu-button__bar'])} />
      <span className={classnames(styles['menu-button__bar'])} />
    </button>
  );
}

export default BurgerMenuButton;
