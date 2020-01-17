import React, { Fragment } from "react";

const Input = ({
  name,
  label,
  type,
  value,
  placeholder,
  onChange,
  className,
  onKeyDown
}) => {
  return (
    <Fragment>
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={"form-control " + className}
        onKeyDown={onKeyDown}
      ></input>
    </Fragment>
  );
};

export default Input;
