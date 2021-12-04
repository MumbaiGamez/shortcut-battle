import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import {
  selectConfig,
  selectAppShortcuts,
} from '../../../../redux/slices/configSlice';
import {
  reset,
  pause,
  start,
  selectScore,
  selectPhase,
  selectActiveShortcut,
} from '../../../../redux/slices/gameSlice';
import { Loader } from '../../../../components/Loader';
import { Button, ButtonTheme } from '../../../../components/Button';

import { Phase } from '../../../../../typings/gameTypes';

import FullscreenOpen from '../../../../assets/icons/fullscreenOpen.svg';
import FullscreenExit from '../../../../assets/icons/fullscreenExit.svg';
import styles from './GameUI.css';

type GameUIProps = {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
};

export const GameUI = (props: GameUIProps) => {
  const { isFullscreen, toggleFullscreen } = props;

  const dispatch = useAppDispatch();

  const { count } = useAppSelector(selectConfig);
  const score = useAppSelector(selectScore);
  const phase = useAppSelector(selectPhase);
  const activeShortcut = useAppSelector(selectActiveShortcut);
  const appShortcuts = useAppSelector(selectAppShortcuts);

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

  useEffect(() => {
    setTimeout(handleReset, 2000);
  }, [dispatch, handleReset]);

  return (
    <div className={classNames(styles.gameUI, styles[phase])}>
      <div className={styles.filler} />
      <section className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.scores}>
            <b>Scores:</b> <span>{score}</span>
          </div>
          <div className={styles.keys}>
            <b className={styles.action}>Fire:</b>
            <div className={styles.shortcut}>
              <div className={styles.shortcutWrapper}>
                <span className={styles.shortcutDesc}>{desc}</span>
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
              Pause
            </Button>
            <Button
              theme={ButtonTheme.Glow}
              className={styles.headerButton}
              onClick={handleReset}
            >
              Exit
            </Button>
          </div>
        </header>
        <main>
          <div className={styles.loader}>
            <Loader />
          </div>
          <div className={styles.initialized}>
            <Button onClick={handleStart}>Start new game</Button>
          </div>
          <div className={styles.paused}>
            <Button onClick={handleStart}>Continue</Button>
          </div>
          <div className={styles.gameOver}>
            <h2 className={styles.title}>Game Over</h2>
            <Button onClick={handleReset}>Try again</Button>
          </div>
          <div className={styles.congrats}>
            <h2 className={styles.title}>Congrats, you won!</h2>
            <Button onClick={handleReset}>Restart</Button>
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
