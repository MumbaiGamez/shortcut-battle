import { useContext, useEffect } from 'react';

import { EngineContext } from '../../context';
import { useLayer } from '../../hooks/useLayer';

import { LayerProps } from '../../../../../typings/gameTypes';

type BulletProps = {
  bullet: LayerProps;
};

export const Bullet = (props: BulletProps) => {
  const { bullet } = props;

  const engine = useContext(EngineContext);

  const bulletLayer = useLayer(bullet);

  useEffect(() => {
    engine?.addLayer(bulletLayer);

    return () => {
      engine?.removeLayer(bulletLayer);
    };
  }, [bulletLayer, engine]);

  return null;
};
