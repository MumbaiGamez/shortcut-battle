import React from 'react';

import styles from './Card.css';

export const Card = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>Title</div>
      <div className={styles.cardSubtitle}>Subtitle</div>
    </div>
  );
};
