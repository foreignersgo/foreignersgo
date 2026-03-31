import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export default function Input({
  label,
  error,
  helperText,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm sm:text-base font-medium text-navy">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 sm:py-4 border-2 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold focus:border-transparent
          transition-all duration-200 bg-white text-base sm:text-lg
          ${error ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500 flex items-center space-x-1">
          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500 flex items-center space-x-1">
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          {helperText}
        </p>
      )}
    </div>
  );
}
