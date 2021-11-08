import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonProps = {
  children: ReactNode;

  className?: string;
  isDisabled?: boolean;
  theme?: ButtonTheme;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export enum ButtonTheme {
  Glow = 'Glow',
}
