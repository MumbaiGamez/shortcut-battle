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
      errorCallback,
      errorMessage,
      handleLoading,
      method,
      successCallback,
      url,
    } = props;

    if (handleLoading) {
      handleLoading(true);
    }

    return fetch(`${API_URL}${url}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return JSON.parse(JSON.stringify(res));
      })
      .then((data) => {
        const { reason } = data;
        if (handleLoading) {
          handleLoading(false);
        }
        if (reason) {
          errorCallback(reason);
        } else {
          successCallback();
          return data;
        }
      })
      .catch(() => {
        errorCallback(errorMessage);
        if (handleLoading) {
          handleLoading(false);
        }
      });
  }

  login(props: LoginAPIProps) {
    const { data, errorCallback, handleLoading, successCallback } = props;

    return this.fetchData({
      data,
      errorCallback,
      errorMessage: 'Login error',
      handleLoading,
      method: ApiMethods.POST,
      successCallback,
      url: '/auth/signin',
    });
  }

  registration(props: RegistrationAPIProps) {
    const { data, errorCallback, handleLoading, successCallback } = props;

    return this.fetchData({
      data,
      errorCallback,
      errorMessage: 'Registration error',
      handleLoading,
      method: ApiMethods.POST,
      successCallback,
      url: '/auth/signup',
    });
  }
}

export const authAPI = new Auth();
