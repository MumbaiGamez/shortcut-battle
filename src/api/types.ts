export type LoginDataType = {
  login: string;
  password: string;
};

type HandleError = (error: string) => void;

type HandleSuccess = () => void;

type HandleLoading = (isLoading: boolean) => void;

export type LoginAPIProps = {
  data: LoginDataType;
  handleError: HandleError;
  handleLoading: HandleLoading;
  handleSuccess: HandleSuccess;
};

export type RegistrationDataType = {
  firstName: string;
  secondName: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type RegistrationAPIProps = {
  data: RegistrationDataType;
  handleError: HandleError;
  handleLoading: HandleLoading;
  handleSuccess: HandleSuccess;
};

export type FetchMethodsProps = {
  errorMessage: string;
  url: string;

  data?: RegistrationDataType | LoginDataType;
  handleError?: HandleError;
  handleLoading?: HandleLoading;
  handleSuccess?: HandleSuccess;
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
