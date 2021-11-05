import { ValidationRules } from '../../typings/commonTypes';
import { emailRegExp, phoneRegExp } from './regex';

export const getValidationError = (
  rules: ValidationRules | undefined,
  value: string | number
) => {
  if (!rules) {
    return '';
  }

  let errorMessage = '';
  if (rules.isRequired && !value) {
    errorMessage = `Field is required`;
  } else if (rules.minSymbols && rules.minSymbols > value.toString().length) {
    errorMessage = `Less then ${rules.minSymbols} symbols`;
  } else if (rules.phone && !value.toString().match(phoneRegExp)) {
    errorMessage = `Invalid phone`;
  } else if (rules.email && !value.toString().match(emailRegExp)) {
    errorMessage = `Invalid email`;
  }

  return errorMessage;
};
