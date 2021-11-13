import { useEffect } from 'react';

import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
} from '../../constants';
import { useLayer } from '../../hooks/useLayer';
import { PlayerAction, usePlayerKeys } from './usePlayerKeys';

import { Entity, LayerComponentProps } from '../../types';

import playerImg from '../../../../assets/images/player.png';

const startX = CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2;
const startY = CANVAS_HEIGHT - 2 * PLAYER_HEIGHT;

export const Player = (props: LayerComponentProps) => {
  const { engine } = props;

  const player = useLayer({
    ctx: engine.ctx,
    pos: [startX, startY],
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    src: playerImg,
    type: Entity.player,
  });

  usePlayerKeys(player, {
    [PlayerAction.moveLeft]: { code: 'ArrowLeft' },
    [PlayerAction.moveRight]: { code: 'ArrowRight' },
  });

  useEffect(() => {
    engine.addLayer(Entity.player, player);
  }, [player, engine]);

  useEffect(() => {
    engine.setCollisionHandler(
      Entity.player,
      [Entity.leftBorder, Entity.rightBorder],
      (layer) => {
        layer.x.current = layer.prevX.current;
        layer.y.current = layer.prevY.current;
      }
    );
  }, [engine]);

  return null;
};
