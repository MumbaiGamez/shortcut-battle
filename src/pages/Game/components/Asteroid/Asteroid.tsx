import { useEffect } from 'react';

import { useLayer } from '../../hooks/useLayer';

import { Entity, LayerComponentProps, LayerProps } from '../../types';

type AsteroidProps = LayerComponentProps & {
  asteroid: LayerProps;
};

export const Asteroid = (props: AsteroidProps) => {
  const { engine, asteroid } = props;

  const asteroidLayer = useLayer(asteroid);

  useEffect(() => {
    engine.addLayer(Entity.asteroid, asteroidLayer);
  }, [asteroidLayer, engine]);

  return null;
};
