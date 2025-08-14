import React from 'react';

interface ButtonPropsType {
  className?: string;
  children: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonPropsType> = ({ className = '', children, onClick, disabled }) => {
  return (
    <button type="button" role="button" className={`${className}`.trim()} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
