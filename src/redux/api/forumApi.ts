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
        url: 'forum/posts',
      }),
      transformResponse: (response: TopicType[]) => {
        return response.reverse();
      },
    }),
    getTopicById: build.query<TopicType, string | undefined>({
      query: (id) => ({
        url: `forum/posts/${id}`,
      }),
    }),
    addTopic: build.mutation<void, NewTopicType>({
      query: (topic) => ({
        url: 'forum/posts',
        method: ApiMethods.POST,
        body: topic,
      }),
    }),
    getComments: build.query<CommentType[], string | undefined>({
      query: (id) => ({
        url: `forum/posts/${id}/comments`,
      }),
    }),
    addComment: build.mutation<void, string>({
      query: (comment) => ({
        url: 'forum/comments',
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
