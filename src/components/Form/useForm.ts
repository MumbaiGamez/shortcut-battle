import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RoutesList } from '../NavigationMenu/useNavigationMenu';

import { FieldsList, FieldsObject, UseFormProps } from './types';

export const useForm = (props: UseFormProps) => {
  const { fieldsList, setError } = props;

  const fieldsObject = fieldsList.reduce<FieldsObject>(
    (acc, fieldName: FieldsList) => {
      acc[fieldName] = false;

      return acc;
    },
    {}
  );

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [formFieldsValidation, setFormFieldsValidation] =
    useState(fieldsObject);

  useEffect(() => {
    const isFormValid = Object.values(formFieldsValidation).every(
      (field) => field
    );

    setIsFormValid(isFormValid);
  }, [formFieldsValidation]);

  const validateField = useCallback(
    (fieldName: string, isValid: boolean) => {
      setFormFieldsValidation({
        ...formFieldsValidation,
        [fieldName]: isValid,
      });
    },
    [formFieldsValidation]
  );

  const navigate = useNavigate();

  const handleError = useCallback(
    (error: string) => {
      setError(error);
    },
    [setError]
  );

  const handleSuccess = useCallback(() => {
    setIsSuccess(true);
    navigate(RoutesList.home);
  }, [navigate]);

  const handleLoading = useCallback((isLoading: boolean) => {
    setIsLoading(isLoading);
  }, []);

  return {
    handleError,
    handleLoading,
    handleSuccess,
    isFormValid,
    isLoading,
    isSuccess,
    validateField,
  };
};
