import { useCallback, useEffect, useRef } from 'react';

import { useAppSelector } from '../../../redux/hooks';
import { selectPhase } from '../../../redux/slices/gameSlice';

import { Engine, Phase } from '../../../../typings/gameTypes';

export const useAnimationLoop = (engine: Engine) => {
  const phase = useAppSelector(selectPhase);

  const loop = useRef<number>(0);
  const prevUpdate = useRef<number>(performance.now());
  const lastUpdate = useRef<number>(performance.now());

  const animate = useCallback(() => {
    prevUpdate.current = lastUpdate.current;
    lastUpdate.current = performance.now();

    engine.render(lastUpdate.current - prevUpdate.current);

    loop.current = requestAnimationFrame(animate);
  }, [engine]);

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
