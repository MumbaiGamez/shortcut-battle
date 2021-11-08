import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';

import { Loader } from '../../../../components/Loader';
import { Button, ButtonTheme } from '../../../../components/Button';

import { GameStage, GameUIProps } from '../../types';

import styles from './GameUI.css';

export const GameUI = (props: GameUIProps) => {
  const { stage, setStage } = props;

  const start = useCallback(() => {
    setStage(GameStage.playing);
  }, [setStage]);

  const pause = useCallback(() => {
    setStage(GameStage.pause);
  }, [setStage]);

  const restart = useCallback(() => {
    setStage(GameStage.ready);
  }, [setStage]);

  useEffect(() => {
    setTimeout(() => {
      setStage(GameStage.ready);
    }, 2000);
  }, [setStage]);

  return (
    <div className={classNames(styles.gameUI, styles[stage])}>
      <div className={styles.filler} />
      <section className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.scores}>
            <b>Scores:</b> <span>0</span>
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
              onClick={restart}
            >
              Exit
            </Button>
          </div>
        </header>
        <main>
          <div className={styles.loader}>
            <Loader />
          </div>
          <div className={styles.inited}>
            <Button onClick={start}>Start new game</Button>
          </div>
          <div className={styles.paused}>
            <Button onClick={start}>Continue</Button>
          </div>
          <div className={styles.gameOver}>
            <Button onClick={restart}>Try again</Button>
          </div>
        </main>
      </section>
    </div>
  );
};
