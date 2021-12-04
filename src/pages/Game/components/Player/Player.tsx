import { useContext, useEffect } from 'react';

import { useAppSelector } from '../../../../redux/hooks';
import { selectPhase } from '../../../../redux/slices/gameSlice';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  MIN_PLAYER_SPEED,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
} from '../../constants';
import { EngineContext } from '../../context';
import { useLayer } from '../../hooks/useLayer';
import { useEmit } from '../../hooks/useBus';

import {
  Entity,
  GameEvent,
  Layer,
  Phase,
  PlayerAction,
} from '../../../../../typings/gameTypes';

import playerImg from '../../../../assets/images/player.png';

const startX = CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2;
const startY = CANVAS_HEIGHT - 2 * PLAYER_HEIGHT;

export const Player = () => {
  const engine = useContext(EngineContext);

  const phase = useAppSelector(selectPhase);

  const player = useLayer({
    pos: [startX, startY],
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    src: playerImg,
    type: Entity.player,
  });

  const emit = useEmit();

  useEffect(() => {
    if (phase !== Phase.ready) {
      engine?.addLayer(player);
    }

    return () => {
      engine?.removeLayer(player);
    };
  }, [engine, phase, player]);

  useEffect(() => {
    engine?.setCollisionHandler(
      Entity.player,
      [Entity.leftBorder, Entity.rightBorder],
      (layer: Layer) => {
        layer.x.current = layer.prevX.current;
        layer.y.current = layer.prevY.current;
      }
    );

    engine?.setCollisionHandler(Entity.player, [Entity.asteroid], () => {
      emit(GameEvent.crash);
    });

    engine?.setShortcutHandler(
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

    engine?.setShortcutHandler(
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
  }, [emit, engine]);

  return null;
};
