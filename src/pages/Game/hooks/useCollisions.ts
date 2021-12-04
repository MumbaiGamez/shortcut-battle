import { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  selectAppShortcuts,
  selectConfig,
} from '../../../redux/slices/configSlice';
import {
  gameOver,
  removeAsteroid,
  removeBullet,
  updateScore,
  updateShortcut,
} from '../../../redux/slices/gameSlice';

import { Engine, Entity, Layer } from '../../../../typings/gameTypes';

export const useCollisions = (engine: Engine) => {
  const dispatch = useAppDispatch();
  const { hitScore } = useAppSelector(selectConfig);
  const shortcuts = useAppSelector(selectAppShortcuts);

  const stop = useCallback((layer: Layer) => {
    layer.x.current = layer.prevX.current;
    layer.y.current = layer.prevY.current;
  }, []);

  const bounce = useCallback((layer: Layer) => {
    layer.x.current = layer.prevX.current;
    layer.setVx(-1 * layer.vx.current);
  }, []);

  useEffect(() => {
    engine.setCollisionHandler(
      Entity.player,
      [Entity.leftBorder, Entity.rightBorder],
      stop
    );

    engine.setCollisionHandler(Entity.player, [Entity.asteroid], () => {
      dispatch(gameOver());
    });

    engine.setCollisionHandler(
      Entity.bullet,
      [Entity.asteroid],
      (bulletLayer: Layer, asteroidLayer: Layer) => {
        if (asteroidLayer.id) {
          dispatch(removeAsteroid(asteroidLayer.id));
        }

        if (bulletLayer.id) {
          dispatch(removeBullet(bulletLayer.id));
        }

        dispatch(updateScore(hitScore));
        dispatch(updateShortcut(Math.floor(Math.random() * shortcuts.length)));
      }
    );

    engine.setCollisionHandler(
      Entity.bullet,
      [Entity.topBorder],
      (bulletLayer) => {
        if (bulletLayer.id) {
          dispatch(removeBullet(bulletLayer.id));
        }
      }
    );

    engine.setCollisionHandler(
      Entity.asteroid,
      [Entity.leftBorder, Entity.rightBorder],
      bounce
    );

    engine.setCollisionHandler(
      Entity.asteroid,
      [Entity.bottomBorder],
      (asteroidLayer) => {
        if (asteroidLayer.id) {
          dispatch(removeAsteroid(asteroidLayer.id));
        }
      }
    );
  }, [bounce, dispatch, engine, hitScore, shortcuts.length, stop]);
};
