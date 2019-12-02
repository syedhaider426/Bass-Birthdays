import React from "react";

const Input = ({ type, id, labelText, name, value, onChange, placeHolder }) => {
  return (
    <React.Fragment>
      <div className="form-group">
        <label htmlFor={name}>{labelText}</label>
        <input
          type={type}
          id={id}
          className="form-control"
          value={value}
          onChange={onChange}
          placeHolder={placeHolder}
        ></input>
      </div>
    </React.Fragment>
  );
};

export default Input;
