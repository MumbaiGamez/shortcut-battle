import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { selectConfig } from '../../../redux/slices/configSlice';
import { hit, out, gameOver } from '../../../redux/slices/gameSlice';
import { useListener } from './useBus';

import { GameEvent } from '../types';

export const useGameEvents = () => {
  const { hitScore } = useAppSelector(selectConfig);

  const dispatch = useAppDispatch();

  useListener(GameEvent.hit, () => {
    dispatch(hit(hitScore));
  });

  useListener(GameEvent.out, () => {
    dispatch(out());
  });

  useListener(GameEvent.crash, () => {
    dispatch(gameOver());
  });
};
