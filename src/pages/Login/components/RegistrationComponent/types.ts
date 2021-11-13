export type RegistrationComponentProps = {
  toggleForm: () => void;
  setError(error: string): void;
};

export type UseRegistrationComponentProps = Pick<
  RegistrationComponentProps,
  'setError'
>;
