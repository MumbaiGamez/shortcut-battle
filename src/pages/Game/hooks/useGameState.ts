import { useCallback, useState } from 'react';

import { Phase } from '../types';

export const useGameState = () => {
  const [phase, setPhase] = useState<Phase>(Phase.loading);
  const [score, setScore] = useState<number>(0);

  const reset = useCallback(() => {
    setPhase(Phase.ready);
    setScore(0);
  }, []);

  const start = useCallback(() => {
    setPhase(Phase.playing);
  }, []);

  const pause = useCallback(() => {
    setPhase(Phase.pause);
  }, []);

  return {
    phase,
    score,
    reset,
    start,
    pause,
  };
};
