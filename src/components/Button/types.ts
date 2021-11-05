import { FC, ButtonHTMLAttributes } from 'react';

export type OwnProps = {
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = FC<OwnProps>;
