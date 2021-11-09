import { InputProps } from '../../../../components/Input';

export type FormComponentProps = {
  buttonText: string;
  inputsList: InputProps[];
  isLoading: boolean;
  isButtonDisabled: boolean;
  onButtonClick(): void;
  title: string;

  switchForm?(): void;
  switchFormClass?: string;
  switchFormText?: string;
};
