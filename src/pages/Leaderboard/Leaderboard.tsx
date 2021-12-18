import React from 'react';

import { useGetLeaderboardQuery } from '@redux/api/leaderboardApi';

import { Card } from '@components/Card';
import { Table } from '@components/Table';

import { useLeaderboard } from './useLeaderboard';

import styles from './Leaderboard.css';

export const Leaderboard = () => {
  useGetLeaderboardQuery();

  const { dataList, headerList, rating, score } = useLeaderboard();

  return (
    <div className={styles.leaderboard}>
      <Card className={styles.card}>
        <div className={styles.row}>
          <span>My rank</span>
          <span>{rating || 'none'}</span>
        </div>
        <div className={styles.row}>
          <span>My score</span>
          <span>{score}</span>
        </div>
      </Card>
      <Card title="Leaderboard">
        <Table dataList={dataList} headerList={headerList} />
      </Card>
    </div>
  );
};
