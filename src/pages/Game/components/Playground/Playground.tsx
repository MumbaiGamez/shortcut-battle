import React, { useEffect } from 'react';

import { setVar } from '../../../../utils/css';
import { GameContext } from '../../context';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../constants';
import { useAnimationLoop } from '../../hooks/useAnimationLoop';
import { useEngine } from '../../hooks/useEngine';
import { useCanvas } from '../../hooks/useCanvas';
import { Background } from '../Background';
import { Borders } from '../Borders';
import { Player } from '../Player';

import { PlaygroundProps } from '../../types';

import styles from './Playground.css';

export const Playground = (props: PlaygroundProps) => {
  const { phase } = props;

  const { ctx, ref, clear } = useCanvas({
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
  });

  const engine = useEngine({ ctx, clear });

  useAnimationLoop(phase, engine.render);

  useEffect(() => {
    setVar('--game-canvas-width', `${CANVAS_WIDTH}px`);
    setVar('--game-canvas-height', `${CANVAS_HEIGHT}px`);
  }, []);

  return (
    <GameContext.Provider value={ctx}>
      <canvas ref={ref} className={styles.canvas} />
      <Background engine={engine} />
      <Borders engine={engine} />
      <Player engine={engine} />
    </GameContext.Provider>
  );
};
