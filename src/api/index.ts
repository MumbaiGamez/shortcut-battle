import { convertObjectKeysToSnakeCase } from '../utils/convertToSnakeCase';

import { ApiMethods, FetchDataProps, FetchMethodsProps } from './types';

const API_URL = 'https://ya-praktikum.tech/api/v2';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const mockEmptyFunction = () => {};

class BasicAPI {
  get(props: FetchMethodsProps) {
    return this.fetchData({ ...props, method: ApiMethods.GET });
  }

  post(props: FetchMethodsProps) {
    return this.fetchData({ ...props, method: ApiMethods.POST });
  }

  put(props: FetchMethodsProps) {
    return this.fetchData({ ...props, method: ApiMethods.PUT });
  }

  delete(props: FetchMethodsProps) {
    return this.fetchData({ ...props, method: ApiMethods.DELETE });
  }

  async fetchData(props: FetchDataProps) {
    const {
      data,
      errorMessage,
      handleError = mockEmptyFunction,
      handleLoading = mockEmptyFunction,
      handleSuccess = mockEmptyFunction,
      method,
      url,
    } = props;

    if (handleLoading) {
      handleLoading(true);
    }

    try {
      const requestParams: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: data
          ? JSON.stringify(convertObjectKeysToSnakeCase(data))
          : undefined,
      };

      const response = await fetch(`${API_URL}${url}`, requestParams);

      if (!response.ok) {
        throw new Error();
      }

      const receivedData = JSON.parse(JSON.stringify(response));

      const { reason } = receivedData;

      if (handleLoading) {
        handleLoading(false);
      }

      if (reason) {
        handleError(reason);
      } else {
        handleSuccess('success');

        return data;
      }
    } catch (error) {
      handleError(errorMessage);

      if (handleLoading) {
        handleLoading(false);
      }
    }
  }
}

export const basicAPI = new BasicAPI();
