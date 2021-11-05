import React, { FC } from 'react';

import { Button } from '../Button';

import styles from './App.css';

export const App: FC = () => {
  return (
    <div className={styles.app}>
      <h1>Shortcut Battle</h1>
      <h2>Coming soon</h2>
      <br />
      <Button>Sample button</Button>
    </div>
  );
};
