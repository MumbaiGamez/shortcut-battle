export type LoginComponentProps = {
  switchForm: () => void;
  setError(error: string): void;
};

export type UseLoginComponentProps = Pick<LoginComponentProps, 'setError'>;
