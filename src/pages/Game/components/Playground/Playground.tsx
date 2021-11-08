import React, { ForwardedRef, forwardRef, useCallback } from 'react';

import { getVar } from '../../../../utils/css';
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
import { useBackground } from '../../useBackground';

import { PlaygroundProps, PlayerAction, Entity } from '../../types';

import playerImg from '../../../../assets/images/player.png';
import bgImg from '../../../../assets/images/starBackground.png';
import styles from './Playground.css';

export const Playground = forwardRef(
  (props: PlaygroundProps, ref: ForwardedRef<HTMLCanvasElement>) => {
    const { ctx, phase, clearCanvas } = props;

    const background = useBackground({
      ctx,
      src: bgImg,
    });

    const leftBorder = useLayer({
      ctx,
      pos: [0, 0],
      width: 1,
      height: CANVAS_HEIGHT,
      color: getVar('--game-ui-filler-bg-color'),
      entity: Entity.border,
    });

    const rightBorder = useLayer({
      ctx,
      pos: [CANVAS_WIDTH - 1, 0],
      width: 1,
      height: CANVAS_HEIGHT,
      color: getVar('--game-ui-filler-bg-color'),
      entity: Entity.border,
    });

    const startX = CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2;
    const startY = CANVAS_HEIGHT - 2 * PLAYER_HEIGHT;

    const player = useLayer({
      ctx,
      pos: [startX, startY],
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
      src: playerImg,
      entity: Entity.player,
    });

    player.onCollide([leftBorder, rightBorder]);

    usePlayerKeys(player, {
      [PlayerAction.moveLeft]: { code: 'ArrowLeft' },
      [PlayerAction.moveRight]: { code: 'ArrowRight' },
    });

    const render = useCallback(
      (dt: number) => {
        if (!ctx) {
          return;
        }

        clearCanvas();
        background.render();
        player.render(dt);
      },
      [player, background, ctx, clearCanvas]
    );

    useAnimationLoop(phase, render);

    return (
      <GameContext.Provider value={ctx}>
        <canvas ref={ref} className={styles.canvas} />
      </GameContext.Provider>
    );
  }
);

Playground.displayName = 'Playground';
