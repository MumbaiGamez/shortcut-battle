import { useCallback, useEffect, useState } from 'react';

import { ASTEROID_SIZE_SMALL, CANVAS_WIDTH } from '../../constants';
import { useEventBus, GameEvent } from '../../hooks/useEventBus';

import {
  CanvasContext,
  Engine,
  Entity,
  GameConfig,
  GameState,
  Layer,
  LayerProps,
  Phase,
} from '../../types';

import asteroidImg from '../../../../assets/images/meteorSmall.png';

type UseEnemyProps = {
  engine: Engine;
  config: GameConfig;
  state: GameState;
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
    state: { phase },
    config: {
      asteroids: { count, interval },
    },
  } = props;

  const [generatedCount, setGeneratedCount] = useState<number>(0);
  const [asteroids, setAsteroids] = useState<LayerProps[]>([]);

  const blow = useCallback((asteroidId: number) => {
    setAsteroids((prev) => prev.filter(({ id }) => id !== asteroidId));
  }, []);

  const bounce = useCallback((asteroidLayer: Layer) => {
    asteroidLayer.x.current = asteroidLayer.prevX.current;
    asteroidLayer.setVx(-1 * asteroidLayer.vx.current);
  }, []);

  const generate = useCallback(() => {
    setAsteroids((prev) => [...prev, createAsteroid(ctx)]);
    setGeneratedCount((prev) => prev + 1);
  }, [ctx]);

  useEffect(() => {
    if (generatedCount < count && phase === Phase.playing) {
      setTimeout(generate, interval);
    }
  }, [count, generate, generatedCount, interval, phase]);

  const { emit } = useEventBus(GameEvent.hit, (asteroidLayer) => {
    if (asteroidLayer.id) {
      blow(asteroidLayer.id);
    }
  });

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
