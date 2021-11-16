import React, { useEffect } from 'react';

import { Event, useEventBus } from '../../hooks/useEventBus';
import { Asteroid } from '../Asteroid';
import { useAsteroidsGenerator } from './useAsteroidsGenerator';

import { Entity, LayerComponentProps } from '../../types';

export const Enemy = (props: LayerComponentProps) => {
  const { engine } = props;

  const { generate, asteroids, blow } = useAsteroidsGenerator(engine.ctx);

  useEventBus(Event.hit, (asteroidLayer) => {
    asteroidLayer.id && blow(asteroidLayer.id);
  });

  useEffect(() => {
    const interval = setInterval(() => generate(), 2000);
    setTimeout(() => clearInterval(interval), 20000);
  }, [generate]);

  useEffect(() => {
    engine.setCollisionHandler(
      Entity.asteroid,
      [Entity.leftBorder, Entity.rightBorder],
      (asteroid) => {
        asteroid.x.current = asteroid.prevX.current;
        asteroid.setVx(-1 * asteroid.vx.current);
      }
    );
  }, [engine]);

  return (
    <>
      {asteroids.map((asteroid) => (
        <Asteroid engine={engine} asteroid={asteroid} key={asteroid.id} />
      ))}
    </>
  );
};
