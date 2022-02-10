import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  useGetLeaderboardMutation,
  useUpdateLeaderboardMutation,
} from '@redux/api/leaderboardApi';
import { selectConfig } from '@redux/slices/configSlice';
import {
  reset,
  start,
  selectPhase,
  selectPlayerStats,
} from '@redux/slices/gameSlice';

import { Loader } from '@components/Loader';
import { Button } from '@components/Button';
import { GameHeader } from './components/GameHeader';
import { ConfigHeader } from './components/ConfigHeader';

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
  const phase = useAppSelector(selectPhase);
  const stats = useAppSelector(selectPlayerStats);

  const [updateLeaderboard] = useUpdateLeaderboardMutation();
  const [getLeaderboard] = useGetLeaderboardMutation();

  const handleReset = useCallback(() => {
    dispatch(reset(count));
  }, [count, dispatch]);

  const handleStart = useCallback(() => {
    dispatch(start());
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
        <GameHeader />
        <ConfigHeader />
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
