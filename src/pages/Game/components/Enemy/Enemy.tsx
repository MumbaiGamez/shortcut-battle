import React, { useEffect } from 'react';

import { Event, useEventBus } from '../../hooks/useEventBus';
import { Asteroid } from '../Asteroid';
import { useAsteroidsGenerator } from './useAsteroidsGenerator';

import {
  Entity,
  GameConfig,
  GameState,
  LayerComponentProps,
  Phase,
} from '../../types';

type EnemyProps = LayerComponentProps & {
  state: GameState;
  config: GameConfig;
};

export const Enemy = (props: EnemyProps) => {
  const { engine, state, config } = props;

  const { asteroids, generatedCount, generate, blow } = useAsteroidsGenerator(
    engine.ctx
  );

  const { emit } = useEventBus(Event.hit, (asteroidLayer) => {
    asteroidLayer.id && blow(asteroidLayer.id);
  });

  useEffect(() => {
    if (
      generatedCount < config.asteroids.count &&
      state.phase === Phase.playing
    ) {
      setTimeout(generate, config.asteroids.interval);
    }
  }, [
    config.asteroids.count,
    config.asteroids.interval,
    generate,
    generatedCount,
    state.phase,
  ]);

  useEffect(() => {
    engine.setCollisionHandler(
      Entity.asteroid,
      [Entity.leftBorder, Entity.rightBorder],
      (asteroid) => {
        asteroid.x.current = asteroid.prevX.current;
        asteroid.setVx(-1 * asteroid.vx.current);
      }
    );

    engine.setCollisionHandler(
      Entity.asteroid,
      [Entity.bottomBorder],
      (asteroidLayer) => {
        asteroidLayer.id && blow(asteroidLayer.id);
        emit(Event.out);
      }
    );
  }, [blow, emit, engine]);

  return (
    <>
      {asteroids.map((asteroid) => (
        <Asteroid engine={engine} asteroid={asteroid} key={asteroid.id} />
      ))}
    </>
  );
};
