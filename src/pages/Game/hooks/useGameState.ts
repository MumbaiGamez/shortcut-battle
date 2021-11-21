import { useCallback, useEffect, useRef, useState } from 'react';

import { useEventBus, Event } from './useEventBus';

import { GameConfig, Phase } from '../types';

export const useGameState = (config: GameConfig) => {
  const [phase, setPhase] = useState<Phase>(Phase.loading);
  const [score, setScore] = useState<number>(0);
  const enemiesLeft = useRef<number>(config.asteroids.count);

  const hit = () => {
    enemiesLeft.current -= 1;
    setScore((score) => score + config.asteroids.hitScore);
  };

  const out = () => {
    enemiesLeft.current -= 1;
  };

  const reset = useCallback(() => {
    setPhase(Phase.ready);
    setScore(0);
    enemiesLeft.current = config.asteroids.count;
  }, [config.asteroids.count]);

  const start = useCallback(() => {
    setPhase(Phase.playing);
  }, []);

  const pause = useCallback(() => {
    setPhase(Phase.pause);
  }, []);

  const gameOver = useCallback(() => {
    setPhase(Phase.over);
  }, []);

  useEffect(() => {
    if (!enemiesLeft) {
      setPhase(Phase.win);
    }
  }, [enemiesLeft]);

  useEventBus(Event.hit, () => {
    hit();
  });

  useEventBus(Event.out, () => {
    out();
  });

  useEventBus(Event.crash, () => {
    gameOver();
  });

  return {
    phase,
    score,
    reset,
    start,
    pause,
  };
};
