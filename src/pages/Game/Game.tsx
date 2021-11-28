import React, { useRef } from 'react';
import classNames from 'classnames';

import { GameUI } from './components/GameUI';
import { Playground } from './components/Playground';
import { useGameState } from './hooks/useGameState';
import { useGameConfig } from './hooks/useGameConfig';
import { useFullscreen } from './hooks/useFullscreen';
import { Provider as EventBusProvider } from './hooks/useBus';

import styles from './Game.css';

export const Game = () => {
  const config = useGameConfig();

  const state = useGameState(config);

  const pageRef = useRef(null);
  const { isFullscreen, toggle } = useFullscreen(pageRef.current);

  return (
    <EventBusProvider>
      <main
        className={classNames(styles.game, isFullscreen && styles.fullscreen)}
        ref={pageRef}
      >
        <GameUI
          state={state}
          isFullscreen={isFullscreen}
          toggleFullscreen={toggle}
        />
        <Playground state={state} config={config} />
      </main>
    </EventBusProvider>
  );
};
