import { InputProps } from '../../../../components/Input';

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
