import React from "react";

const Select = ({ name, options, value, onChange }) => {
  console.log(options);

  return (
    <div className="records-per-page">
      <select
        name={name}
        id={name}
        className="form-control"
        onChange={onChange}
        value={value}
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
