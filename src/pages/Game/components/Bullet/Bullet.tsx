import { useEffect } from 'react';

import { useLayer } from '../../hooks/useLayer';

import { Entity, LayerComponentProps, LayerProps } from '../../types';

type BulletProps = LayerComponentProps & {
  bullet: LayerProps;
};

export const Bullet = (props: BulletProps) => {
  const { engine, bullet } = props;

  const bulletLayer = useLayer(bullet);

  useEffect(() => {
    engine.addLayer(Entity.bullet, bulletLayer);
  }, [bulletLayer, engine]);

  return null;
};
