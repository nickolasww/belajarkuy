"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { 
    label?: string;
    error?: string;
    showPasswordToggle?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, type, showPasswordToggle, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState(type);
    
    useEffect(() => {
      if(type === "password" && showPasswordToggle) {
        setInputType(showPassword ? "text" : "password");
      }
    }, [showPassword, type, showPasswordToggle]);

    const TooglePasswordVisibility = () => { 
        setShowPassword(!showPassword);
    }

    const baseClasses =
      "flex h-12 w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
    const passwordPadding = showPasswordToggle && type === "password" ? "pr-10" : ""
    const borderClasses = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
      : "border-gray-300 focus:border-orange-500 focus:ring-orange-500/20"

    const combinedClasses = `${baseClasses} ${passwordPadding} ${borderClasses} ${className}`.trim()

    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <div className="relative">
          <input type={inputType} className={combinedClasses} ref={ref} {...props} />
          {showPasswordToggle && type === "password" && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              onClick={TooglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
            </button>
          )}
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input