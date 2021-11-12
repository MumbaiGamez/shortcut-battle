import { basicAPI } from './';
import { RegistrationAPIProps, LoginAPIProps } from './types';

enum AuthURL {
  SIGNUP = '/auth/signup',
  SIGNIN = '/auth/signin',
  LOGOUT = '/auth/logout',
}

class AuthAPI {
  login(props: LoginAPIProps) {
    const { data, handleError, handleLoading, handleSuccess } = props;

    return basicAPI.post({
      data,
      handleError,
      errorMessage: 'Login error',
      handleLoading,
      handleSuccess,
      url: AuthURL.SIGNIN,
    });
  }

  registration(props: RegistrationAPIProps) {
    const { data, handleError, handleLoading, handleSuccess } = props;

    basicAPI.post({
      data,
      handleError,
      errorMessage: 'Registration error',
      handleLoading,
      handleSuccess,
      url: AuthURL.SIGNUP,
    });
  }

  logout() {
    basicAPI.post({ errorMessage: 'Logout error', url: AuthURL.LOGOUT });
  }
}

export const authAPI = new AuthAPI();
