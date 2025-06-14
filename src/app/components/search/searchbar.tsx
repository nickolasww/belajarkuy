import * as React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: "text" | "password" | "email" | "number";
    placeholder?: string;
    className?: string;
    }

const SearchBar: React.FC<InputProps> = ({type, placeholder, className}) => {
  return (
    <div>
      <input
        type  = {type}
        placeholder = {placeholder}
        className={className}
        />
    </div>
  )
}

export default SearchBar