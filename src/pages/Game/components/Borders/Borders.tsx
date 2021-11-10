import { useEffect } from 'react';

import { getVar } from '../../../../utils/css';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../constants';
import { useLayer } from '../../hooks/useLayer';

import { EntityType, LayerComponentProps } from '../../types';

export const Borders = (props: LayerComponentProps) => {
  const { engine } = props;

  const leftBorder = useLayer({
    ctx: engine.ctx,
    pos: [0, 0],
    width: 1,
    height: CANVAS_HEIGHT,
    color: getVar('--game-ui-filler-bg-color'),
    type: EntityType.leftBorder,
  });

  const rightBorder = useLayer({
    ctx: engine.ctx,
    pos: [CANVAS_WIDTH - 1, 0],
    width: 1,
    height: CANVAS_HEIGHT,
    color: getVar('--game-ui-filler-bg-color'),
    type: EntityType.rightBorder,
  });

  useEffect(() => {
    engine.addLayer(EntityType.leftBorder, leftBorder);
    engine.addLayer(EntityType.rightBorder, rightBorder);
  }, [engine, leftBorder, rightBorder]);

  return null;
};
