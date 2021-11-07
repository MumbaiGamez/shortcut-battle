import { useCallback, useEffect, useRef } from 'react';

import { GameStage } from './types';

export const useAnimationLoop = (
  stage: GameStage,
  callback: (dt: number) => void
) => {
  const loop = useRef<number>(0);
  const prevUpdate = useRef<number>(performance.now());
  const lastUpdate = useRef<number>(performance.now());

  const animate = useCallback(() => {
    if (stage === GameStage.playing) {
      prevUpdate.current = lastUpdate.current;
      lastUpdate.current = performance.now();

      const dt = lastUpdate.current - prevUpdate.current;
      callback(dt);

      loop.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(loop.current);
      loop.current = 0;
    }
  }, [stage, lastUpdate, callback]);

  useEffect(() => {
    animate();
  }, [animate]);
};
