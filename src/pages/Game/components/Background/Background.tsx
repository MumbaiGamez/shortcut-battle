import { useEffect } from 'react';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../constants';
import { useLayer } from '../../hooks/useLayer';

import { EntityType, LayerComponentProps } from '../../types';

import bgImg from '../../../../assets/images/starBackground.png';

export const Background = (props: LayerComponentProps) => {
  const { engine } = props;

  const background = useLayer({
    ctx: engine.ctx,
    pos: [0, 0],
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    src: bgImg,
    type: EntityType.background,
  });

  useEffect(() => {
    engine.addLayer(EntityType.background, background);
  }, [background, engine]);

  return null;
};
