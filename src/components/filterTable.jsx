import React from "react";

/*if you see query parametrs in the web address, there is a form*/
const FilteredTable = ({ value, onChange, handleBirthday, refresh }) => {
  return (
    <React.Fragment>
      <div className="form-group">
        <label htmlFor="query">
          <span style={{ fontWeight: "bold" }}>Artist</span>
        </label>
        <input
          type="text"
          name="query"
          className="form-control"
          placeholder="Enter Artist Name"
          value={value}
          onChange={e => onChange(e.currentTarget.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="birthday">
          <span style={{ fontWeight: "bold" }}>Birthday</span>
        </label>
        <input
          type="date"
          name="birthday"
          id="birthday"
          className="form-control"
          onChange={handleBirthday}
          placeholder="Enter Birthday"
        ></input>
      </div>
    </React.Fragment>
  );
};

export default FilteredTable;
