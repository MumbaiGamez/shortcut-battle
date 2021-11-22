import { useEffect } from 'react';

import { useLayer } from '../../hooks/useLayer';

import { LayerComponentProps, LayerProps } from '../../types';

type AsteroidProps = LayerComponentProps & {
  asteroid: LayerProps;
};

export const Asteroid = (props: AsteroidProps) => {
  const { engine, asteroid } = props;

  const asteroidLayer = useLayer(asteroid);

  useEffect(() => {
    engine.addLayer(asteroidLayer);

    return () => {
      engine.removeLayer(asteroidLayer);
    };
  }, [asteroidLayer, engine]);

  return null;
};
