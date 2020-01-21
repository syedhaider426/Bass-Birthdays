import React, { Fragment } from "react";
import Input from "../common/Input";
import Select from "../common/Select";

/*
 * Consists of:
 *
 * 2 inputs (1 to filter by artist, 1 to filter by date)
 * 1 dropdown (determines how many records can be shown at once)
 */

const FilteredTable = ({
  onChange,
  handleBirthday,
  amountPerPage,
  options,
  handleSelect
}) => {
  return (
    <Fragment>
      <div className="mb-1">
        <div className="input-group mb-2">
          {/* Filters out the artists on the table by name*/}
          <Input
            type="text"
            name="artist"
            id="artist"
            className="mr-2"
            placeholder="Enter Artist"
            onChange={e => onChange(e.target.value)}
          />
          {/* Filters out the artists on the table by date*/}
          <Input
            type="date"
            name="birthday"
            id="birthday"
            onChange={handleBirthday}
          />
        </div>
        <div className="form-inline">
          {/* Filters out the number of artists shown*/}
          <Select
            name={"Records Per Page"}
            value={amountPerPage}
            options={options}
            onChange={handleSelect}
          />
          <label className="ml-1">Records Per Page</label>
        </div>
      </div>
    </Fragment>
  );
};

export default FilteredTable;
