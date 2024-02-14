import * as React from 'react';
import classnames from 'classnames';
import styles from './style.module.scss';

const StatusMessage = () => {
  return (
    <div className={classnames(styles['status-message'])}>
      <div className={classnames(styles['status-message__spinner'])}></div>
      <div className={classnames(styles['status-message__text'])}>
        Loading game configuration...
      </div>
    </div>
  );
};

export default StatusMessage;
