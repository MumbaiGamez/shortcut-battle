import React from 'react';

import { GameUI } from './components/GameUI';
import { Playground } from './components/Playground';
import { useGameEvents } from './hooks/useGameEvents';
import { Provider as EventBusProvider } from './hooks/useBus';

import styles from './Game.css';

export const Game = () => {
  useGameEvents();

  return (
    <EventBusProvider>
      <main className={styles.game}>
        <GameUI />
        <Playground />
      </main>
    </EventBusProvider>
  );
};
