import { ReactNode } from 'react';

export type TextWithUnderlinePropsType = {
  text: string | ReactNode;

  onClick?(): void;
  className?: string;
};
