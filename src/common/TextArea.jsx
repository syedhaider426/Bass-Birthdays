import React from "react";

const TextArea = ({ name, label, type, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        type={type}
        className="form-control"
      ></textarea>
    </div>
  );
};
