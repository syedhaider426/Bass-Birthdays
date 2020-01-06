import React from "react";

/*if you see query parametrs in the web address, there is a form*/
const FilteredTable = ({ value, onChange, handleBirthday, refresh }) => {
  return (
    <React.Fragment>
      <div className="input-group filter-table">
        <input
          type="text"
          name="query"
          className="text-line"
          placeholder="Enter Artist"
          value={value}
          onChange={e => onChange(e.currentTarget.value)}
        />
        <div className="divider" />
        <input
          type="date"
          name="birthday"
          id="birthday"
          className="text-line"
          onChange={handleBirthday}
          onfocus="(this.placeholder='')"
        ></input>
        <span className="add-on">
          <i className="icon-th"></i>
        </span>
      </div>
    </React.Fragment>
  );
};

export default FilteredTable;
