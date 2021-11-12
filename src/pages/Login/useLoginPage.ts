import { useState, useCallback } from 'react';

export const useLogin = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  const [errorId, setErrorId] = useState<number | null>(null);
  const [error, setError] = useState('');

  const handleError = useCallback((errorText: string) => {
    setError(errorText);
    setErrorId(new Date().getTime());
  }, []);

  return {
    error,
    errorId,
    handleError,
    isLogin,
    toggleForm,
  };
};
