import { basicAPI } from './';
import { RegistrationAPIProps, LoginAPIProps, ProfileAPIProps } from './types';

enum AuthURL {
  SIGNUP = '/auth/signup',
  SIGNIN = '/auth/signin',
  LOGOUT = '/auth/logout',
  GET_USER = '/auth/user',
}

class AuthAPI {
  login(props: LoginAPIProps) {
    return basicAPI.post({
      ...props,
      errorMessage: 'Login error',
      url: AuthURL.SIGNIN,
    });
  }

  signup(props: RegistrationAPIProps) {
    basicAPI.post({
      ...props,
      errorMessage: 'Registration error',
      url: AuthURL.SIGNUP,
    });
  }

  logout() {
    basicAPI.post({ errorMessage: 'Logout error', url: AuthURL.LOGOUT });
  }

  getUserInfo(props: ProfileAPIProps) {
    return basicAPI.get({
      ...props,
      errorMessage: 'Get user info error',
      url: AuthURL.GET_USER,
    });
  }
}

export const authAPI = new AuthAPI();
