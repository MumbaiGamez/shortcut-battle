import { useEffect } from 'react';

import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  MIN_PLAYER_SPEED,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
} from '../../constants';
import { useLayer } from '../../hooks/useLayer';

import { Entity, Layer, LayerComponentProps, PlayerAction } from '../../types';

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

  useEffect(() => {
    engine.addLayer(Entity.player, player);

    return () => {
      engine.removeLayer(player);
    };
  }, [player, engine]);

  useEffect(() => {
    engine.setCollisionHandler(
      Entity.player,
      [Entity.leftBorder, Entity.rightBorder],
      (layer: Layer) => {
        layer.x.current = layer.prevX.current;
        layer.y.current = layer.prevY.current;
      }
    );

    engine.setShortcutHandler(
      Entity.player,
      PlayerAction.moveLeft,
      (layer: Layer, pressed, allPressed) => {
        if (!pressed && !allPressed?.moveRight) {
          layer.vx.current = 0;
        }

        if (pressed) {
          layer.vx.current = -1 * MIN_PLAYER_SPEED;
        }
      }
    );

    engine.setShortcutHandler(
      Entity.player,
      PlayerAction.moveRight,
      (layer: Layer, pressed, allPressed) => {
        if (!pressed && !allPressed?.moveLeft) {
          layer.vx.current = 0;
        }

        if (pressed) {
          layer.vx.current = MIN_PLAYER_SPEED;
        }
      }
    );
  }, [engine]);

  return null;
};
