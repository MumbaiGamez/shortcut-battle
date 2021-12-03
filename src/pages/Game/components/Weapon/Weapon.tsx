import React from 'react';

import { useAppSelector } from '../../../../redux/hooks';
import { selectBullets, selectPhase } from '../../../../redux/slices/gameSlice';
import { Bullet } from '../Bullet';

import { Phase } from '../../../../../typings/gameTypes';

export const Weapon = () => {
  const phase = useAppSelector(selectPhase);
  const bullets = useAppSelector(selectBullets);

  return phase === Phase.ready ? null : (
    <>
      {bullets.map((bullet) => (
        <Bullet bullet={bullet} key={bullet.id} />
      ))}
    </>
  );
};
