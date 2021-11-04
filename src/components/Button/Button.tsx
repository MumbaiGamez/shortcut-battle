import React from 'react';
import cn from 'classnames';
import { Props } from './types';
import s from './Button.css';

const Button: Props = ({ children, className, ...props }) => {
  return (
    <button className={cn(s.button, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
