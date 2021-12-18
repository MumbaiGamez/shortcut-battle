import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { endpoints as userEndpoints } from '../api/userApi';
import {
  endpoints as leaderboardEndpoints,
  LeaderData,
  Leaders,
} from '../api/leaderboardApi';

import { LayerProps, Phase } from '../../../typings/gameTypes';

type Game = {
  phase: Phase;
  currentScore: number;
  enemiesCount: number;
  enemiesGenerated: number;
  enemiesDestroyed: number;
  activeShortcut: number;
  asteroids: LayerProps[];
  bullets: LayerProps[];
  stats: {
    player: LeaderData;
    leaders: Leaders;
  };
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
    player: {
      login: '',
      score: 0,
      rating: 0,
    },
    leaders: [],
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
        state.stats.player.score += state.currentScore;
        state.phase = Phase.win;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userEndpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        state.stats.player.login = payload.login;
      }
    );

    builder.addMatcher(
      leaderboardEndpoints.getLeaderboard.matchFulfilled,
      (state, { payload }) => {
        state.stats.leaders = payload;

        if (!state.stats.player.login) {
          return;
        }

        const playerStats = payload.find(
          ({ login }) => login === state.stats.player.login
        );

        if (!playerStats) {
          return;
        }

        state.stats.player = playerStats;
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

export const selectPlayerStats = createSelector(
  selectGame,
  (state) => state.stats.player
);

export const selectLeaders = createSelector(
  selectGame,
  (state) => state.stats.leaders
);

export default gameSlice.reducer;
