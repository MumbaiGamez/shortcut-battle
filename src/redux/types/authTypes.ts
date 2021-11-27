export type UserDataResponseType = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type UserDataType = {
  id: number;
  firstName: string;
  secondName: string;
  displayName: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type ProfileDataType = Pick<
  UserDataType,
  'firstName' | 'secondName' | 'displayName' | 'login' | 'email' | 'phone'
>;

export type LoginDataType = {
  login: string;
  password: string;
};

export type RegistrationDataType = {
  firstName: string;
  secondName: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type UserState = {
  error: null | string;
  loading: boolean;
  user: UserDataType | null;
};
