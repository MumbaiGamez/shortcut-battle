import React from 'react';
import cn from 'classnames';

import styles from './Loader.css';

export const Loader = () => {
  return (
    <div className={styles.spinnerBox}>
      <div className={cn(styles.blueOrbit, styles.common)}></div>

      <div className={cn(styles.greenOrbit, styles.common)}></div>

      <div className={cn(styles.redOrbit, styles.common)}></div>

      <div
        className={cn(styles.whiteOrbit, styles.common, styles.transform1)}
      ></div>
      <div
        className={cn(styles.whiteOrbit, styles.common, styles.transform2)}
      ></div>
      <div
        className={cn(styles.whiteOrbit, styles.common, styles.transform3)}
      ></div>
    </div>
  );
};
