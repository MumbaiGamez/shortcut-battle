export type LoginDataType = {
  login: string;
  password: string;
};

type handleError = (error: string) => void;

type handleSuccess = () => void;

type handleLoading = (isLoading: boolean) => void;

export type LoginAPIProps = {
  data: LoginDataType;
  handleError: handleError;
  handleLoading: handleLoading;
  handleSuccess: handleSuccess;
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
  handleError: handleError;
  handleLoading: handleLoading;
  handleSuccess: handleSuccess;
};

export type FetchDataProps = {
  data: RegistrationDataType | LoginDataType;
  errorMessage: string;
  handleError: handleError;
  handleLoading: handleLoading;
  handleSuccess: handleSuccess;
  method: ApiMethods;
  url: string;
};

export enum ApiMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
