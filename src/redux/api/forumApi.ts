import {
  ApiMethods,
  CommentType,
  NewTopicType,
  NewCommentType,
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
        return response.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
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
    addComment: build.mutation<void, NewCommentType>({
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
