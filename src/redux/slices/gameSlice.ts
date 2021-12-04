import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { LayerProps, Phase } from '../../../typings/gameTypes';

type Game = {
  phase: Phase;
  score: number;
  enemiesCount: number;
  enemiesGenerated: number;
  enemiesDestroyed: number;
  activeShortcut: number;
  asteroids: LayerProps[];
  bullets: LayerProps[];
};

const initialState: Game = {
  phase: Phase.loading,
  score: 0,
  enemiesCount: 0,
  enemiesGenerated: 0,
  enemiesDestroyed: 0,
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
      state.enemiesCount = action.payload;
      state.enemiesGenerated = 0;
      state.enemiesDestroyed = 0;
      state.bullets = [];
      state.asteroids = [];
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
    updateScore: (state, action: PayloadAction<number>) => {
      state.score += action.payload;
    },
    updateShortcut: (state, action: PayloadAction<number>) => {
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

      state.enemiesGenerated += 1;
      state.asteroids.push(newEnemy);
    },
    removeAsteroid: (state, action: PayloadAction<number>) => {
      const { payload: blownId } = action;

      state.asteroids = state.asteroids.filter(({ id }) => id !== blownId);
      state.enemiesDestroyed += 1;

      if (state.enemiesDestroyed >= state.enemiesCount) {
        state.phase = Phase.win;
      }
    },
  },
});

export const {
  reset,
  start,
  pause,
  updateScore,
  gameOver,
  updateShortcut,
  addAsteroid,
  removeAsteroid,
  addBullet,
  removeBullet,
} = gameSlice.actions;

export const selectGame = (state: RootState) => state.game;

export const selectPhase = createSelector(selectGame, (state) => state.phase);

export const selectScore = createSelector(selectGame, (state) => state.score);

export const selectEnemiesGenerated = createSelector(
  selectGame,
  (state) => state.enemiesGenerated
);

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
