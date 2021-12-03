import { useCallback, useEffect, useState } from 'react';

import { useAppSelector } from '../../../../redux/hooks';
import { selectConfig } from '../../../../redux/slices/configSlice';
import { selectPhase } from '../../../../redux/slices/gameSlice';
import { ASTEROID_SIZE_SMALL, CANVAS_WIDTH } from '../../constants';
import { useListener, useEmit } from '../../hooks/useBus';

import {
  CanvasContext,
  Engine,
  Entity,
  GameEvent,
  Layer,
  LayerProps,
  Phase,
} from '../../../../../typings/gameTypes';

import asteroidImg from '../../../../assets/images/meteorSmall.png';

type UseEnemyProps = {
  engine: Engine;
};

const createAsteroid = (ctx: CanvasContext) => {
  return {
    ctx,
    pos: [CANVAS_WIDTH / 4 + (CANVAS_WIDTH / 2) * Math.random(), 0],
    velo: [-0.01 + 0.02 * Math.random(), 0.05 + 0.05 * Math.random()],
    width: ASTEROID_SIZE_SMALL,
    height: ASTEROID_SIZE_SMALL,
    src: asteroidImg,
    type: Entity.asteroid,
    id: Date.now(),
  };
};

export const useEnemy = (props: UseEnemyProps) => {
  const {
    engine: { ctx, setCollisionHandler },
  } = props;

  const phase = useAppSelector(selectPhase);
  const { count, interval } = useAppSelector(selectConfig);

  const [generatedCount, setGeneratedCount] = useState<number>(0);
  const [asteroids, setAsteroids] = useState<LayerProps[]>([]);

  const blow = useCallback((asteroidId: number) => {
    setAsteroids((currentAsteroids) =>
      currentAsteroids.filter(({ id }) => id !== asteroidId)
    );
  }, []);

  const bounce = useCallback((asteroidLayer: Layer) => {
    asteroidLayer.x.current = asteroidLayer.prevX.current;
    asteroidLayer.setVx(-1 * asteroidLayer.vx.current);
  }, []);

  const generate = useCallback(() => {
    setAsteroids((currentAsteroids) =>
      currentAsteroids.concat(createAsteroid(ctx))
    );
    setGeneratedCount((currentGeneratedCount) => currentGeneratedCount + 1);
  }, [ctx]);

  const emit = useEmit();

  useListener(GameEvent.hit, (asteroidLayer) => {
    if (asteroidLayer.id) {
      blow(asteroidLayer.id);
    }
  });

  useEffect(() => {
    if (generatedCount < count && phase === Phase.playing) {
      setTimeout(generate, interval);
    }
  }, [count, generate, generatedCount, interval, phase]);

  useEffect(() => {
    setCollisionHandler(
      Entity.asteroid,
      [Entity.leftBorder, Entity.rightBorder],
      (asteroidLayer) => {
        bounce(asteroidLayer);
      }
    );

    setCollisionHandler(
      Entity.asteroid,
      [Entity.bottomBorder],
      (asteroidLayer) => {
        if (asteroidLayer.id) {
          blow(asteroidLayer.id);
          emit(GameEvent.out);
        }
      }
    );
  }, [blow, bounce, emit, setCollisionHandler]);

  return { asteroids };
};
