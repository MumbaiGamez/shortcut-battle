import React from 'react';
import classNames from 'classnames';

import styles from './Loader.css';

export const Loader = () => {
  return (
    <div className={styles.spinnerBox}>
      <div className={classNames(styles.blueOrbit, styles.common)} />

      <div className={classNames(styles.greenOrbit, styles.common)} />

      <div className={classNames(styles.redOrbit, styles.common)} />

      <div
        className={classNames(
          styles.whiteOrbit,
          styles.common,
          styles.transformEntityFirst
        )}
      />
      <div
        className={classNames(
          styles.whiteOrbit,
          styles.common,
          styles.transformEntitySecond
        )}
      />
      <div
        className={classNames(
          styles.whiteOrbit,
          styles.common,
          styles.transformEntityThird
        )}
      />
    </div>
  );
};
