import React, { useEffect } from 'react';
import classNames from 'classnames';

import { Loader } from '../../../../components/Loader';
import { Button, ButtonTheme } from '../../../../components/Button';

import { GameState } from '../../types';

import styles from './GameUI.css';

type GameUIProps = {
  state: GameState;
};

export const GameUI = (props: GameUIProps) => {
  const {
    state: { phase, reset, pause, start, score },
  } = props;

  useEffect(() => {
    setTimeout(() => {
      reset();
    }, 2000);
  }, [reset]);

  return (
    <div className={classNames(styles.gameUI, styles[phase])}>
      <div className={styles.filler} />
      <section className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.scores}>
            <b>Scores:</b> <span>{score}</span>
          </div>
          <div>
            <Button
              theme={ButtonTheme.Glow}
              className={styles.headerButton}
              onClick={pause}
            >
              Pause
            </Button>
            <Button
              theme={ButtonTheme.Glow}
              className={styles.headerButton}
              onClick={reset}
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
            <Button onClick={start}>Start new game</Button>
          </div>
          <div className={styles.paused}>
            <Button onClick={start}>Continue</Button>
          </div>
          <div className={styles.gameOver}>
            <h2 className={styles.title}>Game Over</h2>
            <Button onClick={reset}>Try again</Button>
          </div>
          <div className={styles.congrats}>
            <h2 className={styles.title}>Congrats, you won!</h2>
            <Button onClick={reset}>Restart</Button>
          </div>
        </main>
      </section>
    </div>
  );
};
