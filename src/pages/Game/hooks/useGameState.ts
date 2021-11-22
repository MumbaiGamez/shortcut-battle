import { useCallback, useRef, useState } from 'react';

import { useListener } from './useBus';

import { GameConfig, GameEvent, Phase } from '../types';

export const useGameState = (config: GameConfig) => {
  const {
    asteroids: { count, hitScore },
  } = config;

  const [phase, setPhase] = useState<Phase>(Phase.loading);
  const [score, setScore] = useState<number>(0);
  const enemiesLeft = useRef<number>(count);

  const hit = useCallback(() => {
    enemiesLeft.current -= 1;

    setScore((score) => score + hitScore);

    if (!enemiesLeft.current) {
      setPhase(Phase.win);
    }
  }, [hitScore]);

  const out = useCallback(() => {
    enemiesLeft.current -= 1;

    if (!enemiesLeft.current) {
      setPhase(Phase.win);
    }
  }, []);

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

  useListener(GameEvent.hit, hit);
  useListener(GameEvent.out, out);
  useListener(GameEvent.crash, gameOver);

  return {
    phase,
    score,
    reset,
    start,
    pause,
  };
};
