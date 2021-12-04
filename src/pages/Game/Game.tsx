import React, { useRef } from 'react';
import classNames from 'classnames';

import { GameUI } from './components/GameUI';
import { Playground } from './components/Playground';
import { useFullscreen } from './hooks/useFullscreen';

import styles from './Game.css';

export const Game = () => {
  const pageRef = useRef(null);

  const { isFullscreen, toggleFullscreen } = useFullscreen(pageRef.current);

  return (
    <main
      className={classNames(styles.game, isFullscreen && styles.fullscreen)}
      ref={pageRef}
    >
      <GameUI isFullscreen={isFullscreen} toggleFullscreen={toggleFullscreen} />
      <Playground />
    </main>
  );
};
