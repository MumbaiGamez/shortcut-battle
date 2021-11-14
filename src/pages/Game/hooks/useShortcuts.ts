import { useCallback, useEffect, useRef } from 'react';

import { PlayerAction, ShortcutsPressed } from '../types';

type KeyCode = string;

type Combination = KeyCode[];

type KeysPressed = Set<KeyCode>;

type KeyboardConfig = Partial<Record<PlayerAction, Combination>>;

const defaultConfig = {
  [PlayerAction.moveLeft]: ['ArrowLeft'],
  [PlayerAction.moveRight]: ['ArrowRight'],
  [PlayerAction.fire]: ['Space'],
};

export const useShortcuts = (config: KeyboardConfig = defaultConfig) => {
  const keysPressed = useRef<KeysPressed>(new Set<KeyCode>());
  const shortcutsPressed = useRef<ShortcutsPressed>({});

  const checkShortcutsPressed = useCallback(() => {
    for (const shortcut of Object.entries(config)) {
      const [action, codes] = shortcut as [PlayerAction, Combination];

      const areAllShorcutKeysPressed = codes.every((code) =>
        keysPressed.current.has(code)
      );

      const areNotOtherKeysPressed = keysPressed.current.size === codes.length;

      shortcutsPressed.current[action] =
        areAllShorcutKeysPressed && areNotOtherKeysPressed;
    }
  }, [config]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const { code } = event;

      keysPressed.current.add(code);
      checkShortcutsPressed();
    };

    const onKeyUp = (event: KeyboardEvent) => {
      const { code } = event;

      keysPressed.current.delete(code);
      checkShortcutsPressed();
    };

    const onBlur = () => {
      keysPressed.current = new Set<KeyCode>();
      shortcutsPressed.current = {};
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
    };
  }, [checkShortcutsPressed]);

  return { shortcutsPressed };
};
