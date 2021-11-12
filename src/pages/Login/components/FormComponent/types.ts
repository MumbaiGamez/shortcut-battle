import { InputProps } from '../../../../components/Input';

export enum FieldsList {
  firstName = 'firstName',
  secondName = 'secondName',
  login = 'login',
  email = 'email',
  phone = 'phone',
  password = 'password',
}

export type FieldsObject = {
  [key in FieldsList]?: boolean;
};

export type UseFormProps = {
  setError: (error: string) => void;
  fieldsList: FieldsList[];
};

export type FormComponentProps = {
  buttonText: string;
  inputsList: InputProps[];
  isLoading: boolean;
  isButtonDisabled: boolean;
  onButtonClick(): void;
  title: string;

  toggleForm?(): void;
  toggleFormClass?: string;
  toggleFormText?: string;
};
