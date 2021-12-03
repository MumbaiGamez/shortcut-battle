import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  selectConfig,
  selectAppShortcuts,
} from '../../../redux/slices/configSlice';
import {
  hit,
  out,
  gameOver,
  nextShortcut,
} from '../../../redux/slices/gameSlice';
import { useListener } from './useBus';

import { GameEvent } from '../../../../typings/gameTypes';

export const useGameEvents = () => {
  const { hitScore } = useAppSelector(selectConfig);
  const shortcuts = useAppSelector(selectAppShortcuts);

  const dispatch = useAppDispatch();

  useListener(GameEvent.hit, () => {
    dispatch(hit(hitScore));
    dispatch(nextShortcut(Math.floor(Math.random() * shortcuts.length)));
  });

  useListener(GameEvent.out, () => {
    dispatch(out());
  });

  useListener(GameEvent.crash, () => {
    dispatch(gameOver());
  });
};
