import { Dispatch, SetStateAction } from 'react';

export type RegistrationComponentProps = {
  switchForm: () => void;
  setError: Dispatch<SetStateAction<string>>;
};

export type UseRegistrationComponentProps = Pick<
  RegistrationComponentProps,
  'setError'
>;
