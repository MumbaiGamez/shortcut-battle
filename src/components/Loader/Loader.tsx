import React from 'react';
import classNames from 'classnames';

import styles from './Loader.css';

export const Loader = () => {
  return (
    <div className={styles.spinnerBox}>
      <div className={classNames(styles.blueOrbit, styles.orbit)} />

      <div className={classNames(styles.greenOrbit, styles.orbit)} />

      <div className={classNames(styles.redOrbit, styles.orbit)} />

      <div
        className={classNames(
          styles.whiteOrbit,
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
