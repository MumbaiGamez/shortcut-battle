import React from 'react';

import { useTranslation } from 'react-i18next';

import { Card } from '@components/Card';
import { Table } from '@components/Table';

import { useLeaderboard } from './useLeaderboard';

import styles from './Leaderboard.css';

export const Leaderboard = () => {
  const { dataList, headerList, rating, score } = useLeaderboard();

  const { t } = useTranslation();

  return (
    <div className={styles.leaderboard}>
      <Card className={styles.card}>
        <div className={styles.row}>
          <span>{t('leaderboard.myRank')}</span>
          <span>{rating || t('leaderboard.none')}</span>
        </div>
        <div className={styles.row}>
          <span>{t('leaderboard.myScore')}</span>
          <span>{score}</span>
        </div>
      </Card>
      <Card title={t('leaderboard.title')}>
        <Table dataList={dataList} headerList={headerList} />
      </Card>
    </div>
  );
};
