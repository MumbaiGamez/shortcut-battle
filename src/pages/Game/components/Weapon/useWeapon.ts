import { useEffect, useRef } from 'react';

import { useAppDispatch } from '../../../../redux/hooks';
import { addBullet } from '../../../../redux/slices/gameSlice';
import {
  BULLET_HEIGHT,
  BULLET_WIDTH,
  MIN_BULLET_SPEED,
  PLAYER_WIDTH,
} from '../../constants';

import {
  Engine,
  Entity,
  Layer,
  PlayerAction,
} from '../../../../../typings/gameTypes';

import asteroidImg from '../../../../assets/images/laserRed.png';

const WEAPON_FIRE_TRESHOLD = 500;

const createBullet = (playerX: number, playerY: number) => {
  return {
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
  const lastShot = useRef<number>(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    engine.setShortcutHandler(
      Entity.player,
      PlayerAction.fire,
      (layer: Layer, pressed) => {
        const now = Date.now();

        if (pressed && now - lastShot.current > WEAPON_FIRE_TRESHOLD) {
          const bullet = createBullet(layer.x.current, layer.y.current);

          dispatch(addBullet(bullet));
          lastShot.current = now;
        }
      }
    );
  }, [dispatch, engine]);
};
