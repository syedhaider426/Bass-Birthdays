import React, { Fragment } from "react";

interface ITextArea {
  name: string;
  label?: string | JSX.Element;
  value: string;
  placeholder: string;
  className: string;
  labelClassName: string;
  errors: { recaptchaVerification: string };
  autoFocus: boolean;
  ariaRequired?: boolean;
  ariaLabel?: string;
  onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
}

const TextArea = ({
  name,
  label,
  value,
  placeholder,
  onChange,
  className,
  labelClassName,
  errors,
  autoFocus,
  ariaRequired,
  ariaLabel,
}: ITextArea): JSX.Element => {
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
        className={className ? className + " form-control" : "form-control"}
        aria-required={ariaRequired}
        aria-label={ariaLabel}
      ></textarea>
      {errors && <div className="alert alert-danger">{errors}</div>}
    </Fragment>
  );
};

export default TextArea;
