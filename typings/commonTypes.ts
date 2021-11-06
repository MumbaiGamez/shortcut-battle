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

export enum RoutesList {
  home = '/',
  login = '/login',
  register = '/register',
  library = '/library',
}

export type ValidationRules = {
  minSymbols?: number;
  phone?: boolean;
  email?: boolean;
  isRequired?: boolean;
};
