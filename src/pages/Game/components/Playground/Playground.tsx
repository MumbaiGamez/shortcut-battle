import React from 'react';

import { useAppSelector } from '../../../../redux/hooks';
import { selectPhase } from '../../../../redux/slices/gameSlice';
import { GameContext } from '../../context';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../constants';
import { Background } from '../Background';
import { Borders } from '../Borders';
import { Player } from '../Player';
import { Weapon } from '../Weapon';
import { Enemy } from '../Enemy';
import { useCanvas } from '../../hooks/useCanvas';
import { useEngine } from '../../hooks/useEngine';
import { useAnimationLoop } from '../../hooks/useAnimationLoop';

import { Phase } from '../../../../../typings/gameTypes';

import styles from './Playground.css';

export const Playground = () => {
  const phase = useAppSelector(selectPhase);

  const { ctx, ref } = useCanvas({
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
  });

  const engine = useEngine({ ctx });

  useAnimationLoop(phase, engine.render);

  return (
    <GameContext.Provider value={engine.ctx}>
      <canvas ref={ref} className={styles.canvas} />
      <Background engine={engine} />
      <Borders engine={engine} />
      {phase !== Phase.ready && (
        <>
          <Player engine={engine} />
          <Weapon engine={engine} />
          <Enemy engine={engine} />
        </>
      )}
    </GameContext.Provider>
  );
};
