import React from 'react';

import { useAppSelector } from '../../../../redux/hooks';
import {
  selectAsteroids,
  selectPhase,
} from '../../../../redux/slices/gameSlice';
import { Asteroid } from '../Asteroid';

import { Phase } from '../../../../../typings/gameTypes';

export const Enemy = () => {
  const phase = useAppSelector(selectPhase);
  const asteroids = useAppSelector(selectAsteroids);

  return phase === Phase.ready ? null : (
    <>
      {asteroids.map((asteroid) => (
        <Asteroid asteroid={asteroid} key={asteroid.id} />
      ))}
    </>
  );
};
