import classNames from 'classnames';
import React from 'react';

import styles from './Star.css';
import { StarProps } from './types';

export const Star: StarProps = ({ customClassName }) => {
  return <div className={classNames(styles.star, customClassName)}></div>;
};
