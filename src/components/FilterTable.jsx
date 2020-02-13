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
  bdayQuery,
  currentPage,
  totalRecords
}) => {
  //if currentpage = 1, and records total = 25, then show 1-25,1-50,1-75,1-100
  const startRecord = (currentPage - 1) * amountPerPage;
  var endRecord = startRecord + amountPerPage;
  if (endRecord > totalRecords) endRecord = totalRecords;
  const records = "Showing entries: " + (startRecord + 1) + " - " + endRecord;
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
          <label className="ml-1 records-per-page">entries</label>
          <span className="refresh mr-2" style={{ color: "white" }}>
            {records}{" "}
          </span>
          {/* <button
            className="btn btn-primary"
            onClick={refresh}
            onKeyDown={refresh}
            aria-label="Refresh"
            title="Refresh the data in the Birthdays Table"
          >
            {<span>Clear Filters</span>}
          </button> */}
        </div>
      </div>
    </Fragment>
  );
};

export default FilteredTable;
