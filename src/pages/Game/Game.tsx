import React, { useEffect, useState } from 'react';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants';
import { GameUI } from './components/GameUI';
import { Playground } from './components/Playground';
import { useCanvas } from './useCanvas';

import { GameStage } from './types';

import styles from './Game.css';

export const Game = () => {
  const [stage, setStage] = useState<GameStage>(GameStage.loading);

  const { canvasRef, ctx } = useCanvas({
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
  });

  useEffect(() => {
    setTimeout(() => setStage(GameStage.playing), 0);
  }, []);

  return (
    <main className={styles.game}>
      <GameUI stage={stage} setStage={setStage} />
      <Playground ref={canvasRef} ctx={ctx} stage={stage} />
    </main>
  );
};
