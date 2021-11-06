import classNames from 'classnames';
import React from 'react';

import styles from './Star.css';
import { StarProps } from './types';

export const Star = ({ className }: StarProps) => {
  return <div className={classNames(styles.star, className)}></div>;
};
