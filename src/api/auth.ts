import { basicAPI } from './';
import { RegistrationAPIProps, LoginAPIProps } from './types';

enum AuthURL {
  SIGNUP = '/auth/signup',
  SIGNIN = '/auth/signin',
  LOGOUT = '/auth/logout',
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
}

export const authAPI = new AuthAPI();
