import {
  convertObjectKeysToSnakeCase,
  convertObjectKeysToCamelCase,
} from '../utils/convertToSnakeCase';

import { ApiMethods, FetchDataProps, FetchMethodsProps } from './types';

const API_URL = 'https://ya-praktikum.tech/api/v2';

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
      handleError,
      handleLoading,
      handleSuccess,
      method,
      url,
    } = props;

    handleLoading && handleLoading(true);

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
      const responseText = await response.text();

      const receivedData =
        responseText === 'OK' ? {} : JSON.parse(responseText);

      handleLoading && handleLoading(false);

      if (!response.ok) {
        const { reason } = receivedData;

        throw reason;
      }

      const normilizedData = convertObjectKeysToCamelCase(receivedData);

      if (handleSuccess) {
        handleSuccess(normilizedData);
      }

      return receivedData;
    } catch (error) {
      handleLoading && handleLoading(false);

      if (typeof error === 'string') {
        handleError && handleError(error);
      } else {
        handleError && handleError(errorMessage);
      }
    }
  }
}

export const basicAPI = new BasicAPI();
