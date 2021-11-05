import { InputTypeEnum } from 'commonTypes';
import { FC } from 'react';

export type OwnProps = {
  inputHandler?(value: string): void;
  placeholder?: string;
  type?: InputTypeEnum;
  value?: string;
};

export type InputProps = FC<OwnProps>;

export type UseInputProps = Pick<OwnProps, 'inputHandler' | 'type' | 'value'>;
