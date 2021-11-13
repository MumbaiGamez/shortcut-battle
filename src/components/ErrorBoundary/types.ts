import { ReactNode } from 'react';

export type ErrorBoundaryProps = {
  childred?: ReactNode;
};

export type ErrorBoundaryState = {
  hasError: boolean;
};
