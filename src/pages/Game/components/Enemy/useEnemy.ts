import { useCallback, useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { selectConfig } from '../../../../redux/slices/configSlice';
import {
  selectPhase,
  addAsteroid,
  selectEnemiesGenerated,
} from '../../../../redux/slices/gameSlice';
import { ASTEROID_SIZE_SMALL, CANVAS_WIDTH } from '../../constants';

import { Entity, Phase } from '../../../../../typings/gameTypes';

import asteroidImg from '@assets/images/meteorSmall.png';

const X_MIN = CANVAS_WIDTH / 4;
const X_RANGE = CANVAS_WIDTH / 2;
const VX_MIN = -0.02;
const VX_RANGE = 0.04;
const VY_MIN = 0.02;
const VY_RANGE = 0.02;

const createAsteroid = () => {
  return {
    pos: [X_MIN + X_RANGE * Math.random(), 0],
    velo: [
      VX_MIN + VX_RANGE * Math.random(),
      VY_MIN + VY_RANGE * Math.random(),
    ],
    width: ASTEROID_SIZE_SMALL,
    height: ASTEROID_SIZE_SMALL,
    src: asteroidImg,
    type: Entity.asteroid,
    id: Date.now(),
  };
};

export const useEnemy = () => {
  const dispatch = useAppDispatch();

  const phase = useAppSelector(selectPhase);
  const enemiesGenerated = useAppSelector(selectEnemiesGenerated);
  const { interval, count } = useAppSelector(selectConfig);

  const generateTimer = useRef(0);

  const generate = useCallback(() => {
    dispatch(addAsteroid(createAsteroid()));
  }, [dispatch]);

  useEffect(() => {
    if (phase === Phase.playing && enemiesGenerated < count) {
      generateTimer.current = window.setTimeout(generate, interval);
    }

    if (phase === Phase.pause || phase === Phase.ready) {
      clearTimeout(generateTimer.current);
    }
  }, [count, enemiesGenerated, generate, interval, phase]);
};
