import { useEffect } from 'react';

import { getVar } from '../../../../utils/css';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../constants';
import { useLayer } from '../../hooks/useLayer';

import { Entity, LayerComponentProps } from '../../types';

export const Borders = (props: LayerComponentProps) => {
  const { engine } = props;

  const leftBorder = useLayer({
    ctx: engine.ctx,
    pos: [0, 0],
    width: 1,
    height: CANVAS_HEIGHT,
    color: getVar('--game-ui-filler-bg-color'),
    type: Entity.leftBorder,
  });

  const rightBorder = useLayer({
    ctx: engine.ctx,
    pos: [CANVAS_WIDTH - 1, 0],
    width: 1,
    height: CANVAS_HEIGHT,
    color: getVar('--game-ui-filler-bg-color'),
    type: Entity.rightBorder,
  });

  const topBorder = useLayer({
    ctx: engine.ctx,
    pos: [0, 0],
    width: CANVAS_WIDTH,
    height: 1,
    color: getVar('--game-ui-filler-bg-color'),
    type: Entity.topBorder,
  });

  const bottomBorder = useLayer({
    ctx: engine.ctx,
    pos: [0, CANVAS_HEIGHT - 1],
    width: CANVAS_WIDTH,
    height: 1,
    color: getVar('--game-ui-filler-bg-color'),
    type: Entity.bottomBorder,
  });

  useEffect(() => {
    engine.addLayer(Entity.leftBorder, leftBorder);
    engine.addLayer(Entity.rightBorder, rightBorder);
    engine.addLayer(Entity.topBorder, topBorder);
    engine.addLayer(Entity.bottomBorder, bottomBorder);
  }, [engine, leftBorder, rightBorder, topBorder, bottomBorder]);

  return null;
};
