import { useEffect } from 'react';

import { MIN_SPEED } from '../../constants';

import { Layer } from '../../types';

export enum PlayerAction {
  moveLeft = 'moveLeft',
  moveRight = 'moveRight',
}

export type Shortcut = {
  code: string;
  ctrl?: boolean;
  shift?: boolean;
  meta?: boolean;
};

type KeysMap = Record<PlayerAction, Shortcut>;

export const usePlayerKeys = (player: Layer, keysMap: KeysMap) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const { code } = event;

      if (code === keysMap.moveLeft.code) {
        player.vx.current = -1 * MIN_SPEED;
      }

      if (code === keysMap.moveRight.code) {
        player.vx.current = MIN_SPEED;
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      const { code } = event;

      if (code === keysMap.moveLeft.code || code === keysMap.moveRight.code) {
        player.vx.current = 0;
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [player, keysMap]);
};
