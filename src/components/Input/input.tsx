import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  clearable?: boolean;
  label?: string;
}

export const Input = ({ 
  type = 'text', 
  clearable, 
  label, 
  value, 
  onChange, 
  className = '', 
  ...props 
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const currentType = isPassword && showPassword ? 'text' : type;

  const handleClear = () => {
    if (onChange) {
      const event = { target: { value: '' } } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full max-w-sm">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      
      <div className="relative flex items-center">
        <input
          {...props}
          type={currentType}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-md outline-none transition-all
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${isPassword || clearable ? 'pr-10' : ''} 
            ${className}`}
        />

        <div className="absolute right-2 flex items-center gap-1">
          {clearable && value && (
            <button
              onClick={handleClear}
              className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
              type="button"
            >
              <X size={16} />
            </button>
          )}

          {isPassword && (
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
              type="button"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
