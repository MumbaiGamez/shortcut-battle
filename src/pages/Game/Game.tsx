import React from 'react';

import { GameUI } from './components/GameUI';
import { Playground } from './components/Playground';
import { useGameState } from './hooks/useGameState';

import styles from './Game.css';

export const Game = () => {
  const state = useGameState();

  return (
    <main className={styles.game}>
      <GameUI state={state} />
      <Playground state={state} />
    </main>
  );
};
