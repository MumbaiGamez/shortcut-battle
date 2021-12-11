import { convertObjectKeysToSnakeCase } from '@utils/convertStringCases';

import {
  ApiMethods,
  LoginDataType,
  RegistrationDataType,
} from '../types/apiTypes';

import { baseApi } from './baseApi';

export const REDIRECT_URI =
  process.env.NODE_ENV === 'production'
    ? 'https://shortcut-battle.herokuapp.com/'
    : 'http://localhost:3000';

enum AuthURL {
  SIGNUP = '/auth/signup',
  SIGNIN = '/auth/signin',
  OAUTH = '/oauth/yandex',
  GET_SERVICE_ID = '/oauth/yandex/service-id',
  LOGOUT = '/auth/logout',
  GET_USER = '/auth/user',
}

type OAuthResponse = {
  service_id: string;
};

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signin: build.mutation<string, LoginDataType>({
      query: (loginData) => ({
        url: AuthURL.SIGNIN,
        method: ApiMethods.POST,
        body: loginData,
      }),
    }),
    signup: build.mutation<string, RegistrationDataType>({
      query: (registrationData) => ({
        url: AuthURL.SIGNUP,
        method: ApiMethods.POST,
        body: convertObjectKeysToSnakeCase(registrationData),
      }),
    }),
    logout: build.mutation<string, void>({
      query: () => ({
        url: AuthURL.LOGOUT,
        method: ApiMethods.POST,
        responseHandler: (response) => response.text(),
      }),
    }),
    OAuth: build.mutation<void, string>({
      query: (code: string) => ({
        url: AuthURL.OAUTH,
        method: ApiMethods.POST,
        body: {
          code,
          redirect_uri: REDIRECT_URI,
        },
        responseHandler: (response) => response.text(),
      }),
    }),
    getOAuthServiceId: build.mutation<OAuthResponse, void>({
      query: () => ({
        url: AuthURL.GET_SERVICE_ID,
        method: ApiMethods.GET,
        params: {
          redirect_uri: REDIRECT_URI,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  endpoints,
  useSigninMutation,
  useSignupMutation,
  useLogoutMutation,
  useOAuthMutation,
  useGetOAuthServiceIdMutation,
} = authApi;
