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
    prevUpdate.current = lastUpdate.current;
    lastUpdate.current = performance.now();

    callback(lastUpdate.current - prevUpdate.current);

    loop.current = requestAnimationFrame(animate);
  }, [callback]);

  useEffect(() => {
    if (phase === Phase.playing) {
      lastUpdate.current = performance.now();
      animate();
    }

    return () => {
      cancelAnimationFrame(loop.current);
    };
  }, [phase, animate]);
};
