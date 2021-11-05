import { InputTypeEnum, ValidationRules } from '../../../typings/commonTypes';
import { FC } from 'react';

export type OwnProps = {
  inputHandler?(value: string): void;
  label?: string;
  placeholder?: string;
  type?: InputTypeEnum;
  validationRule?: ValidationRules;
  value?: string;
};

export type InputProps = FC<OwnProps>;

export type UseInputProps = Pick<
  OwnProps,
  'inputHandler' | 'type' | 'value' | 'validationRule'
>;
