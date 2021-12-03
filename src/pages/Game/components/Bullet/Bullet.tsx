import { useContext, useEffect } from 'react';

import { GameContext } from '../../context';
import { useLayer } from '../../hooks/useLayer';

import { LayerProps } from '../../../../../typings/gameTypes';

type BulletProps = {
  bullet: LayerProps;
};

export const Bullet = (props: BulletProps) => {
  const { bullet } = props;

  const engine = useContext(GameContext);

  const bulletLayer = useLayer(bullet);

  useEffect(() => {
    engine?.addLayer(bulletLayer);

    return () => {
      engine?.removeLayer(bulletLayer);
    };
  }, [bulletLayer, engine]);

  return null;
};
