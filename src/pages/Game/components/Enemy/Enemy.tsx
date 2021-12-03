import React from 'react';

import { Asteroid } from '../Asteroid';
import { useEnemy } from './useEnemy';

import { LayerComponentProps } from '../../../../../typings/gameTypes';

export const Enemy = (props: LayerComponentProps) => {
  const { engine } = props;

  const { asteroids } = useEnemy({ engine });

  return (
    <>
      {asteroids.map((asteroid) => (
        <Asteroid engine={engine} asteroid={asteroid} key={asteroid.id} />
      ))}
    </>
  );
};
