export type LoginDataType = {
  login: string;
  password: string;
};

type errorCallback = (error: string) => void;

type successCallback = () => void;

type loadingCallback = (isLoading: boolean) => void;

export type LoginAPIProps = {
  data: LoginDataType;
  errorCallback: errorCallback;
  successCallback: successCallback;

  loadingCallback?: loadingCallback;
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

  loadingCallback?: loadingCallback;
};

export type FetchDataProps = {
  data: RegistrationDataType | LoginDataType;
  errorCallback: errorCallback;
  errorMessage: string;
  method: ApiMethods;
  successCallback: successCallback;

  loadingCallback?: loadingCallback;
  url: string;
};

export enum ApiMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
