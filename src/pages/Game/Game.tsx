import React, { useState } from 'react';

import { GameUI } from './components/GameUI';
import { Playground } from './components/Playground';

import { Phase } from './types';

import styles from './Game.css';

export const Game = () => {
  const [phase, setPhase] = useState<Phase>(Phase.loading);

  return (
    <main className={styles.game}>
      <GameUI phase={phase} setPhase={setPhase} />
      <Playground phase={phase} />
    </main>
  );
};
