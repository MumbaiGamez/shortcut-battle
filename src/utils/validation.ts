import i18next from 'i18next';

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
    errorMessage = i18next.t('validation.fieldRequired');
  } else if (rules.minSymbols && rules.minSymbols > value.toString().length) {
    isValid = false;
    errorMessage = i18next.t('validation.lessSymbols', {
      count: rules.minSymbols,
    });
  } else if (rules.phone && !value.toString().match(PHONE_REG_EXP)) {
    isValid = false;
    errorMessage = i18next.t('validation.invalidPhone');
  } else if (rules.email && !value.toString().match(EMAIL_REG_EXP)) {
    isValid = false;
    errorMessage = i18next.t('validation.invalidEmail');
  }

  return { isValid, errorMessage };
};
