import fetch from 'isomorphic-fetch';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BASE_API_URL = '/';
const YANDEX_API_URL = 'https://ya-praktikum.tech/api/v2';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    credentials: 'include',
    fetchFn: fetch,
  }),
  endpoints: () => ({}),
});

export const yandexApi = createApi({
  reducerPath: 'yandexApi',
  baseQuery: fetchBaseQuery({
    baseUrl: YANDEX_API_URL,
    credentials: 'include',
    fetchFn: fetch,
  }),
  endpoints: () => ({}),
});
