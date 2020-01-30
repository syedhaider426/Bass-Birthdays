import React from "react";

/* Reusable Select component */
const Select = ({ name, options, value, onChange, ariaLabel }) => {
  return (
    <div className="records-per-page">
      <select
        name={name}
        id={name}
        className="form-control"
        onChange={onChange}
        value={value}
        aria-label={ariaLabel}
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
