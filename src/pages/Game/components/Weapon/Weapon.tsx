import React, { useEffect, useRef } from 'react';

import { Event, useEventBus } from '../../hooks/useEventBus';
import { Bullet } from '../Bullet';
import { useWeapon } from './useWeapon';

import { Entity, Layer, LayerComponentProps, PlayerAction } from '../../types';

const WEAPON_FIRE_TRESHOLD = 500;

export const Weapon = (props: LayerComponentProps) => {
  const { engine } = props;
  const { bullets, fire, blow } = useWeapon(engine.ctx);

  const lastShot = useRef<number>(0);

  const { emit } = useEventBus();

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

    engine.setCollisionHandler(
      Entity.bullet,
      [Entity.asteroid],
      (bulletLayer: Layer, asteroidLayer: Layer) => {
        bulletLayer.id && blow(bulletLayer.id);
        emit(Event.hit, asteroidLayer);
      }
    );
  }, [engine, fire, emit, blow]);

  return (
    <>
      {bullets.map((bullet) => (
        <Bullet engine={engine} bullet={bullet} key={bullet.id} />
      ))}
    </>
  );
};
