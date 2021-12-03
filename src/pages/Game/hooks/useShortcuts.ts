import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useAppSelector } from '../../../redux/hooks';
import { selectAppShortcuts } from '../../../redux/slices/configSlice';
import { selectActiveShortcut } from '../../../redux/slices/gameSlice';

import { PlayerAction, ShortcutsPressed } from '../../../../typings/gameTypes';

type KeyCode = string;

type Combination = KeyCode[];

type KeysPressed = Set<KeyCode>;

const defaultConfig = {
  [PlayerAction.moveLeft]: ['ArrowLeft'],
  [PlayerAction.moveRight]: ['ArrowRight'],
  [PlayerAction.fire]: ['Space'],
};

export const useShortcuts = () => {
  const activeShortcut = useAppSelector(selectActiveShortcut);
  const appShortcuts = useAppSelector(selectAppShortcuts);

  const config = useMemo(() => {
    const { keys } = appShortcuts[activeShortcut];

    return {
      ...defaultConfig,
      [PlayerAction.fire]: keys,
    };
  }, [activeShortcut, appShortcuts]);

  const keysPressed = useRef<KeysPressed>(new Set<KeyCode>());
  const shortcutsPressed = useRef<ShortcutsPressed>({});

  const checkShortcutsPressed = useCallback(() => {
    for (const shortcut of Object.entries(config)) {
      const [action, keys] = shortcut as [PlayerAction, Combination];

      shortcutsPressed.current[action] = keys.every((key) =>
        keysPressed.current.has(key)
      );
    }
  }, [config]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      keysPressed.current.add(key);
      checkShortcutsPressed();
    };

    const onKeyUp = (event: KeyboardEvent) => {
      const { key } = event;

      keysPressed.current.delete(key);
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
