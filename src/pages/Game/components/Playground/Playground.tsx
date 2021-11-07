import React, { ForwardedRef, forwardRef, useCallback } from 'react';

import {
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
} from '../../constants';
import { GameContext } from '../../context';
import { useLayer } from '../../useLayer';
import { useAnimationLoop } from '../../useAnimationLoop';
import { usePlayerKeys } from '../../usePlayerKeys';

import { PlaygroundProps, PlayerAction } from '../../types';

import playerImg from '../../../../assets/images/player.png';
import styles from './Playground.css';

export const Playground = forwardRef(
  (props: PlaygroundProps, ref: ForwardedRef<HTMLCanvasElement>) => {
    const { ctx, stage } = props;

    const startX = CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2;
    const startY = CANVAS_HEIGHT - 2 * PLAYER_HEIGHT;

    const player = useLayer({
      ctx,
      pos: [startX, startY],
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
      src: playerImg,
    });

    usePlayerKeys(player, {
      [PlayerAction.moveLeft]: { code: 'ArrowLeft' },
      [PlayerAction.moveRight]: { code: 'ArrowRight' },
    });

    const render = useCallback(
      (dt: number) => {
        player.render(dt);
      },
      [player]
    );

    useAnimationLoop(stage, render);

    return (
      <GameContext.Provider value={ctx}>
        <canvas ref={ref} className={styles.canvas} />
      </GameContext.Provider>
    );
  }
);

Playground.displayName = 'Playground';
