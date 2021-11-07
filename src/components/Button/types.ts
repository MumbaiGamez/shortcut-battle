import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonProps = {
  children: ReactNode;
  className?: string;
  isGlow?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
