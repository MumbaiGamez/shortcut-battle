import React, { useEffect, useRef } from 'react';

import { Bullet } from '../Bullet';
import { useWeapon } from './useWeapon';

import { Entity, Layer, LayerComponentProps, PlayerAction } from '../../types';

const WEAPON_FIRE_TRESHOLD = 500;

export const Weapon = (props: LayerComponentProps) => {
  const { engine } = props;

  const lastShot = useRef<number>(0);

  const { bullets, fire } = useWeapon(engine.ctx);

  useEffect(() => {
    engine.setShortcutHandler(
      Entity.player,
      PlayerAction.fire,
      (layer: Layer, pressed) => {
        const now = Date.now();

        if (pressed && now - lastShot.current > WEAPON_FIRE_TRESHOLD) {
          fire(layer.x.current, layer.y.current);
          lastShot.current = now;
        }
      }
    );
  }, [engine, fire]);

  return (
    <>
      {bullets.map((bullet) => (
        <Bullet engine={engine} bullet={bullet} key={bullet.id} />
      ))}
    </>
  );
};
