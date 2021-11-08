import React from 'react';

import { CardProps } from './types';

import styles from './Card.css';

export const Card = (props: CardProps) => {
  const { children, subtitle, title } = props;
  return (
    <div className={styles.card}>
      {title && <div className={styles.title}>{title}</div>}
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      <div className={styles.bodyWrapper}>{children}</div>
    </div>
  );
};
