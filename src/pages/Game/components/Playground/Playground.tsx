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

import { GameConfig, GameState, Phase } from '../../types';

import styles from './Playground.css';

type PlaygroundProps = {
  state: GameState;
  config: GameConfig;
};

export const Playground = (props: PlaygroundProps) => {
  const { state, config } = props;

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
      {state.phase !== Phase.ready && (
        <>
          <Player engine={engine} />
          <Weapon engine={engine} />
          <Enemy engine={engine} state={state} config={config} />
        </>
      )}
    </GameContext.Provider>
  );
};
