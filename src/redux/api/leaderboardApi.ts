import { baseApi } from './baseApi';

import { ApiMethods } from '../types/apiTypes';

const LEADERBOARD_URL = '/leaderboard';

type LeaderboardOptions = {
  cursor?: number;
  limit?: number;
  teamName?: string;
};

type LeaderData = {
  login: string;
  score: number;
};

type LeaderboardResponseType = { data: LeaderData }[];

const RATING_FIELD = 'score';
const DEFAULT_TEAM = 'mumbai';
const DEFAULT_LIMIT = 100;

const queryLeaderboardByTeamName =
  (teamName: string) =>
  ({ cursor = 0, limit = DEFAULT_LIMIT } = {}) => ({
    url: `${LEADERBOARD_URL}/${teamName}`,
    method: ApiMethods.POST,
    body: {
      ratingFieldName: RATING_FIELD,
      cursor,
      limit,
    },
  });

const leaderboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    updateLeaderboard: build.mutation<void, LeaderData>({
      query: (data: LeaderData) => ({
        url: LEADERBOARD_URL,
        method: ApiMethods.POST,
        body: {
          data,
          ratingFieldName: RATING_FIELD,
          teamName: DEFAULT_TEAM,
        },
      }),
    }),
    getLeaderboard: build.query<
      LeaderboardResponseType,
      LeaderboardOptions | void
    >({
      query: queryLeaderboardByTeamName(DEFAULT_TEAM),
    }),
    getAllLeaderboard: build.query<
      LeaderboardResponseType,
      LeaderboardOptions | void
    >({
      query: queryLeaderboardByTeamName('all'),
    }),
  }),
  overrideExisting: false,
});

export const {
  endpoints,
  useGetLeaderboardQuery,
  useGetAllLeaderboardQuery,
  useUpdateLeaderboardMutation,
} = leaderboardApi;
