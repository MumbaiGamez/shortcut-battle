import React, { useCallback } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { Button, ButtonTheme } from '@components/Button';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  pause,
  reset,
  selectActiveShortcut,
  selectCurrentScore,
} from '@redux/slices/gameSlice';
import { selectAppShortcuts, selectConfig } from '@redux/slices/configSlice';

import styles from '../GameUI.css';

export const GameHeader = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const currentScore = useAppSelector(selectCurrentScore);
  const { count } = useAppSelector(selectConfig);

  const activeShortcut = useAppSelector(selectActiveShortcut);
  const appShortcuts = useAppSelector(selectAppShortcuts);
  const { name, desc } = appShortcuts[activeShortcut];

  const handleReset = useCallback(() => {
    dispatch(reset(count));
  }, [count, dispatch]);

  const handlePause = useCallback(() => {
    dispatch(pause());
  }, [dispatch]);

  return (
    <header className={classNames(styles.header, styles.gameHeader)}>
      <div className={styles.scores}>
        <b>{t('play.scores')}</b> <span>{currentScore}</span>
      </div>
      <div className={styles.keys}>
        <b className={styles.action}>{t('play.fire')}</b>
        <div className={styles.shortcut}>
          <div className={styles.shortcutWrapper}>
            <span className={styles.shortcutDesc}>{t(desc)}</span>
            <span className={styles.shortcutKeys}>{name}</span>
          </div>
        </div>
      </div>
      <div>
        <Button
          theme={ButtonTheme.Glow}
          className={styles.headerButton}
          onClick={handlePause}
        >
          {t('play.pause')}
        </Button>
        <Button
          theme={ButtonTheme.Glow}
          className={styles.headerButton}
          onClick={handleReset}
        >
          {t('play.exit')}
        </Button>
      </div>
    </header>
  );
};
