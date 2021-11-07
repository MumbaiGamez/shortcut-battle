import React from 'react';
import classNames from 'classnames';

import { CardProps } from './types';

import styles from './Card.css';

export const Card = (props: CardProps) => {
  const { children, className, subtitle, title } = props;
  return (
    <div className={classNames(styles.card, className)}>
      {title && <div className={styles.title}>{title}</div>}
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      {children}
    </div>
  );
};
