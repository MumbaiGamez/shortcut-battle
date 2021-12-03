import React from 'react';

import { Bullet } from '../Bullet';
import { useWeapon } from './useWeapon';

import { LayerComponentProps } from '../../../../../typings/gameTypes';

export const Weapon = (props: LayerComponentProps) => {
  const { engine } = props;

  const { bullets } = useWeapon(engine);

  return (
    <>
      {bullets.map((bullet) => (
        <Bullet engine={engine} bullet={bullet} key={bullet.id} />
      ))}
    </>
  );
};
