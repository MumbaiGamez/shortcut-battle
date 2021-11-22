import React from 'react';

import { Asteroid } from '../Asteroid';
import { useEnemy } from './useEnemy';

import { GameConfig, GameState, LayerComponentProps } from '../../types';

type EnemyProps = LayerComponentProps & {
  state: GameState;
  config: GameConfig;
};

export const Enemy = (props: EnemyProps) => {
  const { engine, state, config } = props;

  const { asteroids } = useEnemy({ engine, state, config });

  return (
    <>
      {asteroids.map((asteroid) => (
        <Asteroid engine={engine} asteroid={asteroid} key={asteroid.id} />
      ))}
    </>
  );
};
