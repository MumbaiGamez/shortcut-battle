import { useCallback, useState } from 'react';

import {
  BULLET_HEIGHT,
  BULLET_WIDTH,
  MIN_BULLET_SPEED,
  PLAYER_WIDTH,
} from '../../constants';

import { CanvasContext, Entity, LayerProps } from '../../types';

import asteroidImg from '../../../../assets/images/laserRed.png';

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

export const useWeapon = (ctx: CanvasContext) => {
  const [bullets, setBullets] = useState<LayerProps[]>([]);

  const fire = useCallback(
    (playerX: number, playerY: number) => {
      if (!ctx) {
        return;
      }

      setBullets((prev) => [...prev, createBullet(ctx, playerX, playerY)]);
    },
    [ctx]
  );

  const blow = useCallback((bulletId: number) => {
    setBullets((prev) => prev.filter(({ id }) => id !== bulletId));
  }, []);

  return { bullets, fire, blow };
};
