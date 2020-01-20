import React, { Fragment } from "react";

const TextArea = ({
  name,
  label,
  type,
  value,
  placeholder,
  onChange,
  className,
  labelClassName,
  errors,
  autoFocus
}) => {
  return (
    <Fragment>
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      <textarea
        autoFocus={autoFocus}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={name}
        name={name}
        type={type}
        className={className ? className + " form-control" : "form-control"}
      ></textarea>
      {errors && <div className="alert alert-danger">{errors}</div>}
    </Fragment>
  );
};

export default TextArea;
