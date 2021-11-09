export type LoginComponentProps = {
  toggleForm: () => void;
  setError(error: string): void;
};

export type UseLoginComponentProps = Pick<LoginComponentProps, 'setError'>;
