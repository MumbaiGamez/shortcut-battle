import { convertObjectKeysToSnakeCase } from '../../utils/convertStringCases';

import { LoginDataType, RegistrationDataType } from '../types/authTypes';

import { baseApi } from './baseApi';

export enum ApiMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

enum AuthURL {
  SIGNUP = '/auth/signup',
  SIGNIN = '/auth/signin',
  LOGOUT = '/auth/logout',
  GET_USER = '/auth/user',
}

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
  }),
  overrideExisting: false,
});

export const {
  endpoints,
  useSigninMutation,
  useSignupMutation,
  useLogoutMutation,
} = authApi;
