export type ValidationRules = {
  minSymbols?: number;
  phone?: boolean;
  email?: boolean;
  isRequired?: boolean;
};

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
  textarea = 'textarea',
  time = 'time',
  url = 'url',
  week = 'week',
}

export type InputProps = {
  className?: string;
  fieldName?: string;
  handleChange?(value: string): void;
  label?: string;
  placeholder?: string;
  validateField?(fieldName: string, isValid: boolean): void;
  type?: InputTypeEnum;
  validationRule?: ValidationRules;
  value?: string;
};

export type UseInputProps = Pick<
  InputProps,
  | 'fieldName'
  | 'handleChange'
  | 'type'
  | 'value'
  | 'validationRule'
  | 'validateField'
>;
