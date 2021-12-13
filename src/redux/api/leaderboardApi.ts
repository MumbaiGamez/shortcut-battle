import { baseApi } from './baseApi';

import { ApiMethods } from '../types/apiTypes';

const LEADERBOARD_URL = '/leaderboard';

type LeaderboardOptions = {
  cursor?: number;
  limit?: number;
  teamName?: string;
};

export type LeaderData = {
  login: string;
  score: number;
  rating?: number;
};

type LeaderboardResponseType = { data: LeaderData }[];

export type Leaders = LeaderData[];

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

const transformLeaderboardResponse = (response: LeaderboardResponseType) => {
  return response
    .map(({ data }) => data)
    .filter(({ login, score }) => login && score)
    .map((data, index) => ({ ...data, rating: index + 1 }));
};

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
    getLeaderboard: build.query<Leaders, LeaderboardOptions | void>({
      query: queryLeaderboardByTeamName(DEFAULT_TEAM),
      transformResponse: transformLeaderboardResponse,
    }),
    getAllLeaderboard: build.query<Leaders, LeaderboardOptions | void>({
      query: queryLeaderboardByTeamName('all'),
      transformResponse: transformLeaderboardResponse,
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
