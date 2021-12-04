import { useCallback, useEffect, useMemo, useState } from 'react';

import { FieldsList, FieldsWithValidation, UseFormProps } from './types';

export const useForm = (props: UseFormProps) => {
  const { fieldsObject } = props;

  const fieldsValidateObject = useMemo(
    () =>
      (Object.keys(fieldsObject) as FieldsList[]).reduce<FieldsWithValidation>(
        (acc, fieldName: FieldsList) => {
          acc[fieldName] = Boolean(fieldsObject[fieldName]);

          return acc;
        },
        {}
      ),
    [fieldsObject]
  );

  const [isFormValid, setIsFormValid] = useState(true);
  const [formFieldsValidation, setFormFieldsValidation] =
    useState(fieldsValidateObject);

  useEffect(() => {
    setFormFieldsValidation(fieldsValidateObject);
  }, [fieldsValidateObject]);

  useEffect(() => {
    const isFormValid = Object.values(formFieldsValidation).every(
      (field) => field
    );

    setIsFormValid(isFormValid);
  }, [fieldsObject, formFieldsValidation]);

  const validateField = useCallback(
    (fieldName: string, isValid: boolean) => {
      setFormFieldsValidation({
        ...formFieldsValidation,
        [fieldName]: isValid,
      });
    },
    [formFieldsValidation]
  );

  return {
    isFormValid,
    validateField,
  };
};
