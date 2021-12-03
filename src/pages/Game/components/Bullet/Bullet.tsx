import { useEffect } from 'react';

import { useLayer } from '../../hooks/useLayer';

import {
  LayerComponentProps,
  LayerProps,
} from '../../../../../typings/gameTypes';

type BulletProps = LayerComponentProps & {
  bullet: LayerProps;
};

export const Bullet = (props: BulletProps) => {
  const { engine, bullet } = props;

  const bulletLayer = useLayer(bullet);

  useEffect(() => {
    engine.addLayer(bulletLayer);

    return () => {
      engine.removeLayer(bulletLayer);
    };
  }, [bulletLayer, engine]);

  return null;
};
