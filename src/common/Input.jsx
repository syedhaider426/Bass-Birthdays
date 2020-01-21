import React, { Fragment } from "react";

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
  errors
}) => {
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
        required
        className={className ? className + " form-control" : "form-control"}
        onKeyDown={onKeyDown}
      ></input>
      {errors && <div className="alert alert-danger">{errors}</div>}
    </Fragment>
  );
};

export default Input;
