import React from "react";

/*if you see query parametrs in the web address, there is a form*/
const FilteredTable = ({ value, onChange, handleBirthday, refresh }) => {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="query">Enter Artist</label>
        <input
          type="text"
          name="query"
          className="form-control"
          placeholder="Search..."
          value={value}
          onChange={e => onChange(e.currentTarget.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="birthday">Enter Birthday</label>
        <input
          type="date"
          name="birthday"
          id="birthday"
          className="form-control"
          onChange={handleBirthday}
          placeholder="Enter Birthday"
        ></input>
        <button className="refresh-button" onClick={() => refresh()}>
          Refresh
        </button>
      </div>
    </div>
  );
};

export default FilteredTable;
