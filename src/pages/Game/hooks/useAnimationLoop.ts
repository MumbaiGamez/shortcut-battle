import { useCallback, useEffect, useRef } from 'react';

import { Phase } from '../types';

export const useAnimationLoop = (
  phase: Phase,
  callback: (dt: number) => void
) => {
  const loop = useRef<number>(0);
  const prevUpdate = useRef<number>(performance.now());
  const lastUpdate = useRef<number>(performance.now());

  const animate = useCallback(() => {
    if (phase === Phase.playing) {
      prevUpdate.current = lastUpdate.current;
      lastUpdate.current = performance.now();

      callback(lastUpdate.current - prevUpdate.current);

      loop.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(loop.current);
      loop.current = 0;
    }
  }, [phase, lastUpdate, callback]);

  useEffect(() => {
    animate();
  }, [animate]);
};
