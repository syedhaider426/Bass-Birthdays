import React, { Fragment } from "react";
import Input from "../common/Input";
import Select from "../common/Select";

/*
 * Consists of:
 *
 * 2 inputs (1 to filter by artist, 1 to filter by date)
 * 1 dropdown (determines how many records can be shown at once)
 */

interface IFilteredTable {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleBirthday: (e: React.FormEvent<HTMLInputElement>) => void;
  amountPerPage: number;
  options: number[];
  handleSelect: (e: React.FormEvent<HTMLSelectElement>) => void;
  searchQuery: string;
  bdayQuery: string;
  currentPage: number;
  totalRecords: number;
}

const FilteredTable = ({
  onChange,
  handleBirthday,
  amountPerPage,
  options,
  handleSelect,
  searchQuery,
  bdayQuery,
  currentPage,
  totalRecords,
}: IFilteredTable): JSX.Element => {
  //if currentpage = 1, and records total = 25, then show 1-25,1-50,1-75,1-100
  const startRecord: number = (currentPage - 1) * amountPerPage;
  let endRecord: number = startRecord + amountPerPage;
  if (endRecord > totalRecords) endRecord = totalRecords;

  const records: string =
    "Showing entries: " + (startRecord + 1) + " - " + endRecord;
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
            className="mr-2"
            value={searchQuery}
            placeholder="Enter Artist"
            onChange={onChange}
            ariaLabel="Artist"
            autoFocus={true}
          />
          {/* Filters out the artists on the table by date*/}
          <Input
            type="date"
            name="birthday"
            value={bdayQuery}
            placeholder="mm/dd/yyyy"
            onChange={handleBirthday}
            ariaLabel="Date"
            ariaRequired={true}
            className=""
            labelClassName=""
            autoFocus={false}
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
          <span className="ml-1 records-per-page">entries</span>
          <span className="refresh mr-2" style={{ color: "white" }}>
            {records}
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default FilteredTable;
