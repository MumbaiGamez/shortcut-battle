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
  handleLoading?: handleLoading;
  successCallback: successCallback;
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
  handleLoading?: handleLoading;
  successCallback: successCallback;
};

export type FetchDataProps = {
  data: any;
  errorCallback: errorCallback;
  errorMessage: string;
  method: ApiMethods;
  handleLoading?: handleLoading;
  successCallback: successCallback;
  url: string;
};

export enum ApiMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
