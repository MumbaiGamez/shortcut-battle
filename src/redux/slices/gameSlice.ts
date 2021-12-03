import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { LayerProps, Phase } from '../../../typings/gameTypes';

type Game = {
  phase: Phase;
  score: number;
  enemiesLeft: number;
  activeShortcut: number;
  asteroids: LayerProps[];
  bullets: LayerProps[];
};

const initialState: Game = {
  phase: Phase.loading,
  score: 0,
  enemiesLeft: 0,
  activeShortcut: 0,
  asteroids: [],
  bullets: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    reset: (state, action: PayloadAction<number>) => {
      state.phase = Phase.ready;
      state.score = 0;
      state.enemiesLeft = action.payload;
    },
    start: (state) => {
      state.phase = Phase.playing;
    },
    pause: (state) => {
      state.phase = Phase.pause;
    },
    gameOver: (state) => {
      state.phase = Phase.over;
    },
    hit: (state, action: PayloadAction<number>) => {
      state.score += action.payload;
      state.enemiesLeft -= 1;

      if (state.enemiesLeft <= 0) {
        state.phase = Phase.win;
      }
    },
    out: (state) => {
      state.enemiesLeft -= 1;

      if (state.enemiesLeft <= 0) {
        state.phase = Phase.win;
      }
    },
    nextShortcut: (state, action: PayloadAction<number>) => {
      state.activeShortcut = action.payload;
    },
    addBullet: (state, action: PayloadAction<LayerProps>) => {
      const { payload: newBullet } = action;

      state.bullets.push(newBullet);
    },
    removeBullet: (state, action: PayloadAction<number>) => {
      const { payload: removeId } = action;

      state.bullets = state.bullets.filter(({ id }) => id !== removeId);
    },
    addAsteroid: (state, action: PayloadAction<LayerProps>) => {
      const { payload: newEnemy } = action;

      state.asteroids.push(newEnemy);
    },
    removeAsteroid: (state, action: PayloadAction<number>) => {
      const { payload: blownId } = action;

      state.asteroids = state.asteroids.filter(({ id }) => id !== blownId);
    },
  },
});

export const {
  reset,
  start,
  pause,
  hit,
  out,
  gameOver,
  nextShortcut,
  addAsteroid,
  removeAsteroid,
  addBullet,
  removeBullet,
} = gameSlice.actions;

export const selectGame = (state: RootState) => state.game;

export const selectPhase = createSelector(selectGame, (state) => state.phase);

export const selectScore = createSelector(selectGame, (state) => state.score);

export const selectAsteroids = createSelector(
  selectGame,
  (state) => state.asteroids
);

export const selectBullets = createSelector(
  selectGame,
  (state) => state.bullets
);

export const selectActiveShortcut = createSelector(
  selectGame,
  (state) => state.activeShortcut
);

export default gameSlice.reducer;
