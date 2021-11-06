import React from 'react';

import { CardProps } from './types';

import styles from './Card.css';

export const Card = (props: CardProps) => {
  const { children, subtitle, title } = props;
  return (
    <div className={styles.card}>
      {title && <div className={styles.cardTitle}>{title}</div>}
      {subtitle && <div className={styles.cardSubtitle}>{subtitle}</div>}
      {children}
    </div>
  );
};
