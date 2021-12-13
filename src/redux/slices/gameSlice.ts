import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { endpoints as userEndpoints } from '../api/userApi';
import { endpoints as leaderboardEndpoints } from '../api/leaderboardApi';

import { LayerProps, Phase, PlayerStats } from '../../../typings/gameTypes';

type Game = {
  phase: Phase;
  currentScore: number;
  enemiesCount: number;
  enemiesGenerated: number;
  enemiesDestroyed: number;
  activeShortcut: number;
  asteroids: LayerProps[];
  bullets: LayerProps[];
  stats: PlayerStats;
};

const initialState: Game = {
  phase: Phase.loading,
  currentScore: 0,
  enemiesCount: 0,
  enemiesGenerated: 0,
  enemiesDestroyed: 0,
  activeShortcut: 0,
  asteroids: [],
  bullets: [],
  stats: {
    login: '',
    score: 0,
  },
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    reset: (state, action: PayloadAction<number>) => {
      state.phase = Phase.ready;
      state.currentScore = 0;
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
    updateCurrentScore: (state, action: PayloadAction<number>) => {
      state.currentScore += action.payload;
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
        state.stats.score += state.currentScore;
        state.phase = Phase.win;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userEndpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        state.stats.login = payload.login;
      }
    );

    builder.addMatcher(
      leaderboardEndpoints.getLeaderboard.matchFulfilled,
      (state, { payload }) => {
        if (!state.stats.login) {
          return;
        }

        const playerStats = payload.find(
          ({ data: { login } }) => login === state.stats.login
        );

        if (!playerStats) {
          return;
        }

        state.stats.score = playerStats.data.score;
      }
    );
  },
});

export const {
  reset,
  start,
  pause,
  updateCurrentScore,
  gameOver,
  updateShortcut,
  addAsteroid,
  removeAsteroid,
  addBullet,
  removeBullet,
} = gameSlice.actions;

export const selectGame = (state: RootState) => state.game;

export const selectPhase = createSelector(selectGame, (state) => state.phase);

export const selectCurrentScore = createSelector(
  selectGame,
  (state) => state.currentScore
);

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

export const selectStats = createSelector(selectGame, (state) => state.stats);

export default gameSlice.reducer;
