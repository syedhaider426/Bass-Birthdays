import React from "react";

/*if you see query parametrs in the web address, there is a form*/
const FilteredTable = ({ value, onChange, handleBirthday, refresh }) => {
  return (
    <React.Fragment>
      <div className="input-group">
        <input
          type="text"
          name="query"
          className="form-control"
          placeholder="Enter Artist Name"
          value={value}
          onChange={e => onChange(e.currentTarget.value)}
        />

        <input
          type="date"
          name="birthday"
          id="birthday"
          className=" form-control"
          onChange={handleBirthday}
          placeholder="Enter Birthday"
        ></input>
        <span class="add-on">
          <i class="icon-th"></i>
        </span>
      </div>
    </React.Fragment>
  );
};

export default FilteredTable;
