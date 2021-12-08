import { ValidationRules } from '@components/Input';
import { EMAIL_REG_EXP, PHONE_REG_EXP } from './regex';

export const getValidationError = (
  rules: ValidationRules | undefined,
  value: string | number
) => {
  let isValid = true;

  if (!rules) {
    return { isValid, errorMessage: '' };
  }

  let errorMessage = '';

  if (rules.isRequired && !value) {
    isValid = false;
    errorMessage = `Field is required`;
  } else if (rules.minSymbols && rules.minSymbols > value.toString().length) {
    isValid = false;
    errorMessage = `Less than ${rules.minSymbols} symbols`;
  } else if (rules.phone && !value.toString().match(PHONE_REG_EXP)) {
    isValid = false;
    errorMessage = `Invalid phone`;
  } else if (rules.email && !value.toString().match(EMAIL_REG_EXP)) {
    isValid = false;
    errorMessage = `Invalid email`;
  }

  return { isValid, errorMessage };
};
