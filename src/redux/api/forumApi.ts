import { ApiMethods, NewTopicType, TopicType } from '../types/apiTypes';
import { baseApi } from './baseApi';

export const topics = [
  {
    id: 1,
    author: 'Name',
    title: 'Title',
    text: 'Description',
    createdAt: 'Created time',
    updatedAt: '01.01.2022',
    comments: [
      {
        id: 1,
        author: 'Comment author 1',
        text: 'Comment text 1',
      },
      {
        id: 2,
        author: 'Comment author 2',
        text: 'Comment text 2',
      },
      {
        id: 3,
        author: 'Comment author 3',
        text: 'Comment text 3',
        comments: [
          {
            id: 4,
            author: 'Comment author 1',
            text: 'Comment text 4',
          },
          {
            id: 5,
            author: 'Comment author 2',
            text: 'Comment text 5',
            comments: [
              {
                id: 6,
                author: 'Comment author 1',
                text: 'Comment text 6',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    author: 'A name',
    title: 'Title',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: 'Created time',
    updatedAt: '01.01.2022',
    comments: [],
  },
  {
    id: 3,
    author: 'B Name',
    title: 'Title',
    text: 'Description',
    createdAt: 'Created time',
    updatedAt: '01.01.2022',
    comments: [],
  },
  {
    id: 4,
    author: 'C name',
    title: 'Title',
    text: 'Description',
    createdAt: 'Created time',
    updatedAt: '01.01.2022',
    comments: [],
  },
];

const forumApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTopics: build.query<TopicType[], void>({
      queryFn: () => {
        return { data: topics };
      },
      // query: () => ({
      //   url: '/forum/topics',
      // }),
    }),
    getTopicById: build.query<TopicType, string | undefined>({
      queryFn: () => {
        return { data: topics[0] };
      },
      // query: (id) => ({
      //   url: `/forum/topics/${id}`,
      // }),
    }),
    addTopic: build.mutation<void, NewTopicType>({
      query: (topic) => ({
        url: '/forum/topics',
        method: ApiMethods.POST,
        body: topic,
      }),
    }),
    addComment: build.mutation<void, string>({
      query: (comment) => ({
        url: '/forum/comments',
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
  useAddCommentMutation,
} = forumApi;
