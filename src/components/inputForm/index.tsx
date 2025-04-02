import React from "react"

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
}

export function InputForm({placeholder, ...rest}: InputFormProps){

  return (
    <input placeholder={placeholder} {...rest} />
  )
}