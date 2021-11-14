import React from 'react';

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

import { GameState } from '../../types';

import styles from './Playground.css';

type PlaygroundProps = {
  state: GameState;
};

export const Playground = (props: PlaygroundProps) => {
  const { state } = props;

  const { ctx, ref } = useCanvas({
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
  });

  const engine = useEngine({ ctx, state });

  useAnimationLoop(state.phase, engine.render);

  return (
    <GameContext.Provider value={engine.ctx}>
      <canvas ref={ref} className={styles.canvas} />
      <Background engine={engine} />
      <Borders engine={engine} />
      <Player engine={engine} />
      <Weapon engine={engine} />
      <Enemy engine={engine} />
    </GameContext.Provider>
  );
};
