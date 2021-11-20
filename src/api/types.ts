export type LoginDataType = {
  login: string;
  password: string;
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

type HandleError = (error: string) => void;

type HandleSuccess = (data: UserDataType | any) => void;

type HandleLoading = (isLoading: boolean) => void;

type BasicAPIProps = {
  handleError?: HandleError;
  handleLoading?: HandleLoading;
  handleSuccess?: HandleSuccess;
};

export type ProfileAPIProps = BasicAPIProps;

export type LoginAPIProps = BasicAPIProps & {
  data: LoginDataType;
};

export type RegistrationDataType = {
  firstName: string;
  secondName: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type RegistrationAPIProps = BasicAPIProps & {
  data: RegistrationDataType;
};

export type FetchMethodsProps = BasicAPIProps & {
  errorMessage: string;
  url: string;

  data?: RegistrationDataType | LoginDataType;
};

export type FetchDataProps = FetchMethodsProps & {
  method: ApiMethods;
};

export enum ApiMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
