import { ReactNode } from 'react';

import { InputProps } from '../Input';

export enum FieldsList {
  displayName = 'displayName',
  email = 'email',
  firstName = 'firstName',
  login = 'login',
  password = 'password',
  phone = 'phone',
  secondName = 'secondName',
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

  children?: ReactNode;
  toggleForm?(): void;
  toggleFormClass?: string;
  toggleFormText?: string;
};
