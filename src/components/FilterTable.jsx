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
  handleSelect,
  refresh,
  searchQuery,
  bdayQuery
}) => {
  return (
    <Fragment>
      <div className="mb-1">
        <label>
          <i>Filter by Artist or Date </i>
        </label>
        <div className="input-group mb-2">
          {/* Filters out the artists on the table by name*/}
          <Input
            type="text"
            name="artist"
            id="artist"
            className="mr-2"
            value={searchQuery}
            placeholder="Enter Artist"
            onChange={e => onChange(e.target.value)}
            ariaLabel="Artist"
          />
          {/* Filters out the artists on the table by date*/}
          <Input
            type="date"
            name="birthday"
            id="birthday"
            value={bdayQuery}
            placeholder="mm/dd/yyyy"
            onChange={handleBirthday}
            ariaLabel="Date"
          />
        </div>
        <div className="form-inline">
          {/* Filters out the number of artists shown*/}
          <Select
            name={"Records Per Page"}
            value={amountPerPage}
            options={options}
            onChange={handleSelect}
            ariaLabel="Records Per Page"
          />
          <label className="ml-1">Records Per Page</label>
          <button
            className="btn btn-primary refresh"
            onClick={refresh}
            onKeyDown={refresh}
            aria-label="Refresh"
            title="Refresh the data in the Birthdays Table"
          >
            {<i className="fa fa-lg fa-refresh"></i>}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default FilteredTable;
