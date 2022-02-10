import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  useGetLeaderboardMutation,
  useUpdateLeaderboardMutation,
} from '@redux/api/leaderboardApi';
import { selectConfig, selectAppShortcuts } from '@redux/slices/configSlice';
import {
  reset,
  pause,
  start,
  selectCurrentScore,
  selectPhase,
  selectActiveShortcut,
  selectPlayerStats,
} from '@redux/slices/gameSlice';

import { Loader } from '@components/Loader';
import { Button, ButtonTheme } from '@components/Button';

import { Phase } from '@typings/gameTypes';

import FullscreenOpen from '@assets/icons/fullscreenOpen.svg';
import FullscreenExit from '@assets/icons/fullscreenExit.svg';
import styles from './GameUI.css';

type GameUIProps = {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
};

const TEMP_LOADER_DELAY = 2000;

export const GameUI = (props: GameUIProps) => {
  const { isFullscreen, toggleFullscreen } = props;

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { count } = useAppSelector(selectConfig);
  const currentScore = useAppSelector(selectCurrentScore);
  const phase = useAppSelector(selectPhase);
  const activeShortcut = useAppSelector(selectActiveShortcut);
  const appShortcuts = useAppSelector(selectAppShortcuts);
  const stats = useAppSelector(selectPlayerStats);

  const [updateLeaderboard] = useUpdateLeaderboardMutation();
  const [getLeaderboard] = useGetLeaderboardMutation();

  const { name, desc } = appShortcuts[activeShortcut];

  const handleReset = useCallback(() => {
    dispatch(reset(count));
  }, [count, dispatch]);

  const handleStart = useCallback(() => {
    dispatch(start());
  }, [dispatch]);

  const handlePause = useCallback(() => {
    dispatch(pause());
  }, [dispatch]);

  const updateStats = useCallback(async () => {
    await updateLeaderboard({
      login: stats.login,
      score: stats.score,
    });
    await getLeaderboard();
  }, [getLeaderboard, stats.login, stats.score, updateLeaderboard]);

  useEffect(() => {
    getLeaderboard();
  }, [getLeaderboard]);

  useEffect(() => {
    setTimeout(handleReset, TEMP_LOADER_DELAY);
  }, [dispatch, handleReset]);

  useEffect(() => {
    if (phase === Phase.win && stats.login) {
      updateStats();
    }
  }, [phase, stats.login, updateStats]);

  return (
    <div
      className={classNames(
        styles.gameUI,
        styles[phase],
        isFullscreen && styles.fullscreen
      )}
    >
      <div className={styles.filler} />
      <section className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.scores}>
            <b>{`${t('play.scores')}:`}</b> <span>{currentScore}</span>
          </div>
          <div className={styles.keys}>
            <b className={styles.action}>{`${t('play.fire')}:`}</b>
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
        <main>
          <div className={styles.loader}>
            <Loader />
          </div>
          <div className={styles.initialized}>
            <Button onClick={handleStart}>{t('play.startGame')}</Button>
          </div>
          <div className={styles.paused}>
            <Button onClick={handleStart}>{t('play.continue')}</Button>
          </div>
          <div className={styles.gameOver}>
            <h2 className={styles.title}>{t('play.gameOver')}</h2>
            <Button onClick={handleReset}>{t('play.tryAgain')}</Button>
          </div>
          <div className={styles.congrats}>
            <h2 className={styles.title}>{t('play.youWon')}</h2>
            <Button onClick={handleReset}>{t('play.restart')}</Button>
          </div>
        </main>
        {phase !== Phase.playing && (
          <button
            className={styles.fullscreenButton}
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <FullscreenExit className={styles.fullscreenExit} />
            ) : (
              <FullscreenOpen className={styles.fullscreenOpen} />
            )}
          </button>
        )}
      </section>
    </div>
  );
};
