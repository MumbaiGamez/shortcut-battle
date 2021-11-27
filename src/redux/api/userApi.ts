import {
  convertObjectKeysToCamelCase,
  convertObjectKeysToSnakeCase,
} from '../../utils/convertStringCases';

import {
  UserDataType,
  UserDataResponseType,
  ProfileDataType,
  ApiMethods,
} from '../types/apiTypes';

import { baseApi } from './baseApi';

enum UserURL {
  UPDATE_AVATAR = '/user/profile/avatar',
  UPDATE_PROFILE = '/user/profile',
  GET_USER = '/auth/user',
}

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<UserDataType, void>({
      query: () => ({
        url: UserURL.GET_USER,
      }),
      transformResponse: (response: UserDataResponseType) => {
        const normilizedData = convertObjectKeysToCamelCase(response);
        return normilizedData as UserDataType;
      },
    }),
    updateUserProfile: build.mutation<UserDataResponseType, ProfileDataType>({
      query: (newUserData) => ({
        url: UserURL.UPDATE_PROFILE,
        method: ApiMethods.PUT,
        body: convertObjectKeysToSnakeCase(newUserData),
      }),
    }),
    updateUserAvatar: build.mutation<
      UserDataResponseType,
      FormData | null | undefined
    >({
      query: (avatar) => ({
        url: UserURL.UPDATE_AVATAR,
        method: ApiMethods.PUT,
        headers: {
          'content-type':
            'multipart/form-data, boundary=----WebKitFormBoundary',
        },
        body: avatar,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  endpoints,
  useGetUserQuery,
  useUpdateUserAvatarMutation,
  useUpdateUserProfileMutation,
} = userApi;
