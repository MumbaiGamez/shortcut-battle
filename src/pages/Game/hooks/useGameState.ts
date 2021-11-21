import { useCallback, useRef, useState } from 'react';

import { useEventBus, GameEvent } from './useEventBus';

import { GameConfig, Phase } from '../types';

export const useGameState = (config: GameConfig) => {
  const {
    asteroids: { count, hitScore },
  } = config;

  const [phase, setPhase] = useState<Phase>(Phase.loading);
  const [score, setScore] = useState<number>(0);
  const enemiesLeft = useRef<number>(count);

  const hit = () => {
    enemiesLeft.current -= 1;

    setScore((score) => score + hitScore);

    if (!enemiesLeft.current) {
      setPhase(Phase.win);
    }
  };

  const out = () => {
    enemiesLeft.current -= 1;

    if (!enemiesLeft.current) {
      setPhase(Phase.win);
    }
  };

  const reset = useCallback(() => {
    enemiesLeft.current = count;

    setPhase(Phase.ready);
    setScore(0);
  }, [count]);

  const start = useCallback(() => {
    setPhase(Phase.playing);
  }, []);

  const pause = useCallback(() => {
    setPhase(Phase.pause);
  }, []);

  const gameOver = useCallback(() => {
    setPhase(Phase.over);
  }, []);

  useEventBus(GameEvent.hit, hit);
  useEventBus(GameEvent.out, out);
  useEventBus(GameEvent.crash, gameOver);

  return {
    phase,
    score,
    reset,
    start,
    pause,
  };
};
