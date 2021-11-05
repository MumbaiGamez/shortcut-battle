import { InputTypeEnum, ValidationRules } from '../../../typings/commonTypes';

export type InputProps = {
  inputHandler?(value: string): void;
  label?: string;
  placeholder?: string;
  type?: InputTypeEnum;
  validationRule?: ValidationRules;
  value?: string;
};

export type UseInputProps = Pick<
  InputProps,
  'inputHandler' | 'type' | 'value' | 'validationRule'
>;
