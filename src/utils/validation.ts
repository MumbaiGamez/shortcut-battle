import { ValidationRules } from '../components/Input';
import { EMAIL_REG_EXP, PHONE_REG_EXP } from './regex';

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
  } else if (rules.phone && !value.toString().match(PHONE_REG_EXP)) {
    errorMessage = `Invalid phone`;
  } else if (rules.email && !value.toString().match(EMAIL_REG_EXP)) {
    errorMessage = `Invalid email`;
  }

  return errorMessage;
};
