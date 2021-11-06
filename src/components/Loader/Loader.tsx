import React from 'react';
import classNames from 'classnames';

import styles from './Loader.css';

export const Loader = () => {
  return (
    <div className={styles.spinnerBox}>
      <div className={classNames(styles.blueOrbit, styles.common)}></div>

      <div className={classNames(styles.greenOrbit, styles.common)}></div>

      <div className={classNames(styles.redOrbit, styles.common)}></div>

      <div
        className={classNames(
          styles.whiteOrbit,
          styles.common,
          styles.transform1
        )}
      ></div>
      <div
        className={classNames(
          styles.whiteOrbit,
          styles.common,
          styles.transform2
        )}
      ></div>
      <div
        className={classNames(
          styles.whiteOrbit,
          styles.common,
          styles.transform3
        )}
      ></div>
    </div>
  );
};
