import React, { useEffect, useState } from 'react';

import { setVar } from '../../utils/css';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants';
import { GameUI } from './components/GameUI';
import { Playground } from './components/Playground';
import { useCanvas } from './hooks/useCanvas';

import { Phase } from './types';

import styles from './Game.css';

export const Game = () => {
  const [phase, setPhase] = useState<Phase>(Phase.loading);

  const { canvasRef, ctx, clearCanvas } = useCanvas({
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
  });

  useEffect(() => {
    setVar('--game-canvas-width', `${CANVAS_WIDTH}px`);
    setVar('--game-canvas-height', `${CANVAS_HEIGHT}px`);
  }, []);

  return (
    <main className={styles.game}>
      <GameUI phase={phase} setPhase={setPhase} />
      <Playground
        ref={canvasRef}
        ctx={ctx}
        clearCanvas={clearCanvas}
        phase={phase}
      />
    </main>
  );
};
