export type RegistrationComponentProps = {
  switchForm: () => void;
  setError(error: string): void;
};

export type UseRegistrationComponentProps = Pick<
  RegistrationComponentProps,
  'setError'
>;
