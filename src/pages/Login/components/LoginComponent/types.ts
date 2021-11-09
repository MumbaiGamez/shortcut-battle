import { Dispatch, SetStateAction } from 'react';

export type LoginComponentProps = {
  switchForm: () => void;
  setError: Dispatch<SetStateAction<string>>;
};

export type UseLoginComponentProps = Pick<LoginComponentProps, 'setError'>;
