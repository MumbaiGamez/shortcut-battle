import React from 'react';

import { GameContext } from '../../context';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../constants';
import { useCanvas } from '../../hooks/useCanvas';
import { useEngine } from '../../hooks/useEngine';
import { useAnimationLoop } from '../../hooks/useAnimationLoop';
import { useWeapon } from '../Weapon/useWeapon';
import { useEnemy } from '../Enemy/useEnemy';
import { Background } from '../Background';
import { Borders } from '../Borders';
import { Player } from '../Player';
import { Weapon } from '../Weapon';
import { Enemy } from '../Enemy';

import styles from './Playground.css';

export const Playground = () => {
  const { ctx, ref } = useCanvas({
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
  });

  const engine = useEngine(ctx);

  useWeapon(engine);
  useEnemy(engine);
  useAnimationLoop(engine);

  return (
    <GameContext.Provider value={engine}>
      <canvas ref={ref} className={styles.canvas} />
      <Background />
      <Borders />
      <Player />
      <Weapon />
      <Enemy />
    </GameContext.Provider>
  );
};
