import React from "react";

interface ISelect {
  name: string;
  options: string[] | number[];
  value: string | number;
  onChange: (e: React.FormEvent<HTMLSelectElement>) => void;
  ariaLabel: string;
  label?: string;
  labelClassName?: string;
}
/* Reusable Select component */
const Select = ({
  name,
  options,
  value,
  onChange,
  ariaLabel,
  label,
  labelClassName,
}: ISelect): JSX.Element => {
  return (
    <div className="records-per-page">
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      <select
        name={name}
        id={name}
        className="form-control"
        onChange={onChange}
        value={value}
        aria-label={ariaLabel}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
