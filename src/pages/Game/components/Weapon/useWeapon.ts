import { useCallback, useEffect, useRef, useState } from 'react';

import {
  BULLET_HEIGHT,
  BULLET_WIDTH,
  MIN_BULLET_SPEED,
  PLAYER_WIDTH,
} from '../../constants';
import { useEmit } from '../../hooks/useBus';

import {
  CanvasContext,
  Engine,
  Entity,
  GameEvent,
  Layer,
  LayerProps,
  PlayerAction,
} from '../../../../../typings/gameTypes';

import asteroidImg from '../../../../assets/images/laserRed.png';

const WEAPON_FIRE_TRESHOLD = 500;

const createBullet = (ctx: CanvasContext, playerX: number, playerY: number) => {
  return {
    ctx,
    pos: [
      playerX + PLAYER_WIDTH / 2 - BULLET_WIDTH / 2,
      playerY - BULLET_HEIGHT,
    ],
    velo: [0, -MIN_BULLET_SPEED],
    width: BULLET_WIDTH,
    height: BULLET_HEIGHT,
    src: asteroidImg,
    type: Entity.bullet,
    id: Date.now(),
  };
};

export const useWeapon = (engine: Engine) => {
  const { ctx, setCollisionHandler, setShortcutHandler } = engine;

  const lastShot = useRef<number>(0);

  const [bullets, setBullets] = useState<LayerProps[]>([]);

  const fire = useCallback(
    (playerX: number, playerY: number) => {
      setBullets((currentBullets) =>
        currentBullets.concat(createBullet(ctx, playerX, playerY))
      );
    },
    [ctx]
  );

  const blow = useCallback((bulletId: number) => {
    setBullets((currentBullets) =>
      currentBullets.filter(({ id }) => id !== bulletId)
    );
  }, []);

  const emit = useEmit();

  useEffect(() => {
    setShortcutHandler(
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

    setCollisionHandler(
      Entity.bullet,
      [Entity.asteroid],
      (bulletLayer: Layer, asteroidLayer: Layer) => {
        if (bulletLayer.id) {
          blow(bulletLayer.id);
          emit(GameEvent.hit, asteroidLayer);
        }
      }
    );
  }, [blow, emit, fire, setCollisionHandler, setShortcutHandler]);

  return { bullets };
};
