import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonProps = {
  children: ReactNode;
  className?: string;
  theme?: ButtonTheme;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export enum ButtonTheme {
  Glow = 'Glow',
}
