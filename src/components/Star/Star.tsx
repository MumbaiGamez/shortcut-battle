import classNames from 'classnames';
import React from 'react';

import { StarProps } from './types';

import styles from './Star.css';

export const Star = ({ className, style }: StarProps) => {
  return <div className={classNames(styles.star, className)} style={style} />;
};
