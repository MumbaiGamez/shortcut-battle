import React from 'react';

import { GameUI } from './components/GameUI';
import { Playground } from './components/Playground';
import { useGameState } from './hooks/useGameState';
import { useGameConfig } from './hooks/useGameConfig';
import { Provider as EventBusProvider } from './hooks/useBus';

import styles from './Game.css';

export const Game = () => {
  const config = useGameConfig();

  const state = useGameState(config);

  return (
    <EventBusProvider>
      <main className={styles.game}>
        <GameUI state={state} />
        <Playground state={state} config={config} />
      </main>
    </EventBusProvider>
  );
};
