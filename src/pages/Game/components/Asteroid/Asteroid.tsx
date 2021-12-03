import { useContext, useEffect } from 'react';

import { GameContext } from '../../context';
import { useLayer } from '../../hooks/useLayer';

import { LayerProps } from '../../../../../typings/gameTypes';

type AsteroidProps = {
  asteroid: LayerProps;
};

export const Asteroid = (props: AsteroidProps) => {
  const { asteroid } = props;

  const engine = useContext(GameContext);

  const asteroidLayer = useLayer(asteroid);

  useEffect(() => {
    engine?.addLayer(asteroidLayer);

    return () => {
      engine?.removeLayer(asteroidLayer);
    };
  }, [asteroidLayer, engine]);

  return null;
};
