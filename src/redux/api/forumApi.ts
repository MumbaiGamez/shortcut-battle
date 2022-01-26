import {
  ApiMethods,
  CommentType,
  NewTopicType,
  TopicType,
} from '../types/apiTypes';
import { baseApi } from './baseApi';

const forumApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTopics: build.query<TopicType[], void>({
      query: () => ({
        url: '/posts',
      }),
    }),
    getTopicById: build.query<TopicType, string | undefined>({
      query: (id) => ({
        url: `/posts/${id}`,
      }),
    }),
    addTopic: build.mutation<void, NewTopicType>({
      query: (topic) => ({
        url: '/posts',
        method: ApiMethods.POST,
        body: topic,
      }),
    }),
    getComments: build.query<CommentType[], string | undefined>({
      query: (id) => ({
        url: `/posts/${id}/comments`,
      }),
    }),
    addComment: build.mutation<void, string>({
      query: (comment) => ({
        url: '/comments',
        method: ApiMethods.POST,
        body: comment,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  endpoints,
  useGetTopicsQuery,
  useGetTopicByIdQuery,
  useAddTopicMutation,
  useGetCommentsQuery,
  useAddCommentMutation,
} = forumApi;
