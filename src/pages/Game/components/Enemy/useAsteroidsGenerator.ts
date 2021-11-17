import { useCallback, useState } from 'react';

import { ASTEROID_SIZE_SMALL, CANVAS_WIDTH } from '../../constants';

import { Entity, CanvasContext, LayerProps } from '../../types';

import asteroidImg from '../../../../assets/images/meteorSmall.png';

const createRandomAsteroid = (ctx: CanvasContext) => {
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

export const useAsteroidsGenerator = (ctx: CanvasContext) => {
  const [generatedCount, setGeneratedCount] = useState(0);
  const [asteroids, setAsteroids] = useState<LayerProps[]>([]);

  const generate = useCallback(() => {
    if (!ctx) {
      return;
    }

    setAsteroids((prev) => [...prev, createRandomAsteroid(ctx)]);
    setGeneratedCount((prev) => prev + 1);
  }, [ctx]);

  const blow = useCallback((asteroidId: number) => {
    setAsteroids((prev) => prev.filter(({ id }) => id !== asteroidId));
  }, []);

  return { asteroids, generatedCount, generate, blow };
};
