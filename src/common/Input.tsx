import React, { Fragment } from "react";

interface iInput {
  name: string;
  label?: string | JSX.Element;
  type: string;
  value: string;
  placeholder: string;
  className?: string;
  labelClassName?: string;
  autoFocus: boolean;
  errors?: string;
  ariaRequired?: boolean;
  ariaLabel?: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
/* Reusable Input Component */
const Input = ({
  name,
  label,
  type,
  value,
  placeholder,
  onChange,
  className,
  labelClassName,
  onKeyDown,
  autoFocus,
  errors,
  ariaRequired,
  ariaLabel,
}: iInput): JSX.Element => {
  return (
    <Fragment>
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      <input
        autoFocus={autoFocus}
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={className ? className + " form-control" : "form-control"}
        onKeyDown={onKeyDown}
        aria-required={ariaRequired}
        aria-label={ariaLabel}
      ></input>
      {errors && <div className="alert alert-danger">{errors}</div>}
    </Fragment>
  );
};

export default Input;
