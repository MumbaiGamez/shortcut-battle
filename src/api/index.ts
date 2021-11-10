import {
  ApiMethods,
  LoginAPIProps,
  RegistrationAPIProps,
  FetchDataProps,
} from '../../typings/apiTypes';

const API_URL = 'https://ya-praktikum.tech/api/v2';

class Auth {
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

    if (handleLoading) {
      handleLoading(true);
    }

    try {
      const response = await fetch(`${API_URL}${url}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

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
        handleSuccess();
        return data;
      }
    } catch (error) {
      handleError(errorMessage);
      if (handleLoading) {
        handleLoading(false);
      }
    }
  }

  login(props: LoginAPIProps) {
    const { data, handleError, handleLoading, handleSuccess } = props;

    return this.fetchData({
      data,
      handleError,
      errorMessage: 'Login error',
      handleLoading,
      method: ApiMethods.POST,
      handleSuccess,
      url: '/auth/signin',
    });
  }

  registration(props: RegistrationAPIProps) {
    const { data, handleError, handleLoading, handleSuccess } = props;

    return this.fetchData({
      data,
      handleError,
      errorMessage: 'Registration error',
      handleLoading,
      method: ApiMethods.POST,
      handleSuccess,
      url: '/auth/signup',
    });
  }
}

export const authAPI = new Auth();
