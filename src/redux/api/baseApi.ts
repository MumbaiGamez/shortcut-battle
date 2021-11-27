import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ya-praktikum.tech/api/v2',
    credentials: 'include',
  }),
  endpoints: () => ({}),
});
