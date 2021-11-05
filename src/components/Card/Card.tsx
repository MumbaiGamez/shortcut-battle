import React from 'react';

import { CardProps } from './types';

import styles from './Card.css';

export const Card = ({ children }: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>Title</div>
      <div className={styles.cardSubtitle}>Subtitle</div>
      {children}
    </div>
  );
};
