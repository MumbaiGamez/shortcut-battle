import React from 'react';

import { GameUI } from './components/GameUI';
import { Playground } from './components/Playground';
import { Provider as EventBusProvider } from './hooks/useBus';

import styles from './Game.css';

export const Game = () => {
  return (
    <EventBusProvider>
      <main className={styles.game}>
        <GameUI />
        <Playground />
      </main>
    </EventBusProvider>
  );
};
