import React from 'react';

import { CardProps } from './types';

import styles from './Card.css';

export const Card = ({ children }: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.title}>Title</div>
      <div className={styles.subtitle}>Subtitle</div>
      {children}
    </div>
  );
};
