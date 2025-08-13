import React from 'react';

interface ButtonPropsType {
  className?: string;
  children: string;
  onClick: () => void;
}

export const Button: React.FC<ButtonPropsType> = ({ className = '', children, onClick }) => {
  return (
    <button role="button" className={`${className}`.trim()} onClick={onClick}>
      {children}
    </button>
  );
};
