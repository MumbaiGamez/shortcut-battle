import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  selectConfig,
  selectAppShortcuts,
} from '../../../redux/slices/configSlice';
import {
  updateScore,
  updateShortcut,
  removeAsteroid,
  removeBullet,
  gameOver,
} from '../../../redux/slices/gameSlice';
import { useListener } from './useBus';

import { GameEvent } from '../../../../typings/gameTypes';

export const useGameEvents = () => {
  const { hitScore } = useAppSelector(selectConfig);
  const shortcuts = useAppSelector(selectAppShortcuts);

  const dispatch = useAppDispatch();

  useListener(GameEvent.hit, (asteroidLayer) => {
    dispatch(updateScore(hitScore));
    dispatch(updateShortcut(Math.floor(Math.random() * shortcuts.length)));

    if (asteroidLayer.id) {
      dispatch(removeAsteroid(asteroidLayer.id));
    }
  });

  useListener(GameEvent.out, (asteroidLayer) => {
    if (asteroidLayer.id) {
      dispatch(removeAsteroid(asteroidLayer.id));
    }
  });

  useListener(GameEvent.miss, (bulletLayer) => {
    if (bulletLayer.id) {
      dispatch(removeBullet(bulletLayer.id));
    }
  });

  useListener(GameEvent.crash, () => {
    dispatch(gameOver());
  });
};
