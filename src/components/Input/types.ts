import { ValidationRules } from '../../../typings/commonTypes';

export enum InputTypeEnum {
  checkbox = 'checkbox',
  color = 'color',
  date = 'date',
  datetime_local = 'datetime-local',
  email = 'email',
  file = 'file',
  hidden = 'hidden',
  image = 'image',
  month = 'month',
  number = 'number',
  password = 'password',
  radio = 'radio',
  range = 'range',
  reset = 'reset',
  search = 'search',
  submit = 'submit',
  tel = 'tel',
  text = 'text',
  time = 'time',
  url = 'url',
  week = 'week',
}

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
