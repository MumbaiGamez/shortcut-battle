import { ReactNode } from 'react';
import { TFunction } from 'react-i18next';

export type ErrorBoundaryProps = {
  children: ReactNode;
  t: TFunction<'translation', undefined>;
};

export type ErrorBoundaryState = {
  hasError: boolean;
};
