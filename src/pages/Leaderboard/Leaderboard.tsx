import React from 'react';

import { Card } from '../../components/Card';
import { Table } from '../../components/Table';

import { useLeaderboard } from './useLeaderboard';

import styles from './Leaderboard.css';

export const Leaderboard = () => {
  const { dataList, headerList, userRank, userScore } = useLeaderboard();

  return (
    <div className={styles.leaderboard}>
      <Card className={styles.card}>
        <div className={styles.row}>
          <span>My rank</span>
          <span>{userRank}</span>
        </div>
        <div className={styles.row}>
          <span>My score</span>
          <span>{userScore}</span>
        </div>
      </Card>
      <Card title="Leaderboard">
        <Table dataList={dataList} headerList={headerList} />
      </Card>
    </div>
  );
};
