import React from 'react';
import classNames from 'classnames';

import styles from './Loader.css';

export const Loader = () => {
  return (
    <div className={styles.spinnerBox}>
      <div className={classNames(styles.orbitBlue, styles.orbit)} />

      <div className={classNames(styles.orbitGreen, styles.orbit)} />

      <div className={classNames(styles.orbitRed, styles.orbit)} />

      <div
        className={classNames(
          styles.orbitWhite,
          styles.orbit,
          styles.transformEntityFirst
        )}
      />
      <div
        className={classNames(
          styles.whiteOrbit,
          styles.orbit,
          styles.transformEntitySecond
        )}
      />
      <div
        className={classNames(
          styles.whiteOrbit,
          styles.orbit,
          styles.transformEntityThird
        )}
      />
    </div>
  );
};
