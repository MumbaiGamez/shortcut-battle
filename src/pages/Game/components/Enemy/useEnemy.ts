import { useCallback, useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { selectConfig } from '../../../../redux/slices/configSlice';
import {
  selectPhase,
  addAsteroid,
  selectEnemiesGenerated,
} from '../../../../redux/slices/gameSlice';
import { ASTEROID_SIZE_SMALL, CANVAS_WIDTH } from '../../constants';
import { useEmit } from '../../hooks/useBus';

import {
  Engine,
  Entity,
  GameEvent,
  Layer,
  Phase,
} from '../../../../../typings/gameTypes';

import asteroidImg from '../../../../assets/images/meteorSmall.png';

const createAsteroid = () => {
  return {
    pos: [CANVAS_WIDTH / 4 + (CANVAS_WIDTH / 2) * Math.random(), 0],
    velo: [-0.01 + 0.02 * Math.random(), 0.05 + 0.05 * Math.random()],
    width: ASTEROID_SIZE_SMALL,
    height: ASTEROID_SIZE_SMALL,
    src: asteroidImg,
    type: Entity.asteroid,
    id: Date.now(),
  };
};

export const useEnemy = (engine: Engine) => {
  const dispatch = useAppDispatch();
  const phase = useAppSelector(selectPhase);
  const enemiesGenerated = useAppSelector(selectEnemiesGenerated);
  const { interval, count } = useAppSelector(selectConfig);

  const generateTimer = useRef(0);

  const bounce = useCallback((asteroidLayer: Layer) => {
    asteroidLayer.x.current = asteroidLayer.prevX.current;
    asteroidLayer.setVx(-1 * asteroidLayer.vx.current);
  }, []);

  const generate = useCallback(() => {
    dispatch(addAsteroid(createAsteroid()));
  }, [dispatch]);

  const emit = useEmit();

  useEffect(() => {
    if (phase === Phase.playing && enemiesGenerated < count) {
      generateTimer.current = window.setTimeout(generate, interval);
    }

    if (phase === Phase.pause || phase === Phase.ready) {
      clearTimeout(generateTimer.current);
    }
  }, [count, enemiesGenerated, generate, interval, phase]);

  useEffect(() => {
    engine.setCollisionHandler(
      Entity.asteroid,
      [Entity.leftBorder, Entity.rightBorder],
      (asteroidLayer) => {
        bounce(asteroidLayer);
      }
    );

    engine.setCollisionHandler(
      Entity.asteroid,
      [Entity.bottomBorder],
      (asteroidLayer) => {
        emit(GameEvent.out, asteroidLayer);
      }
    );
  }, [bounce, emit, engine]);
};
