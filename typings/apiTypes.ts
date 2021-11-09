export type LoginDataType = {
  login: string;
  password: string;
};

type errorCallback = (error: string) => void;

type successCallback = () => void;

type handleLoading = (isLoading: boolean) => void;

export type LoginAPIProps = {
  data: LoginDataType;
  errorCallback: errorCallback;
  successCallback: successCallback;

  handleLoading?: handleLoading;
};

export type RegistrationDataType = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type RegistrationAPIProps = {
  data: RegistrationDataType;
  errorCallback: errorCallback;
  successCallback: successCallback;

  handleLoading?: handleLoading;
};

export type FetchDataProps = {
  data: RegistrationDataType | LoginDataType;
  errorCallback: errorCallback;
  errorMessage: string;
  method: ApiMethods;
  successCallback: successCallback;

  handleLoading?: handleLoading;
  url: string;
};

export enum ApiMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
