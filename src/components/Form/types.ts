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

export type FieldsWithValidation = {
  [key in FieldsList]?: boolean;
};

export type FieldsWithValues = {
  [key in FieldsList]?: string;
};

export type UseFormProps = {
  fieldsObject: FieldsWithValues;
};

export type FormProps = {
  buttonText: string;
  inputsList: InputProps[];
  isLoading: boolean;
  isButtonDisabled: boolean;
  onButtonClick(): void;
  title: string;

  additionalButton?: ReactNode;
  children?: ReactNode;
  toggleForm?(): void;
  toggleFormClass?: string;
  toggleFormText?: string;
};
