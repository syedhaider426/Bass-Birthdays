import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

/* Reusable Table Component
 *   -Consists of TableHeader and TableBody components
 */
const Table = ({
  data,
  sortColumn,
  onSort,
  refresh,
  headers,
  isLoaded,
  handleClick
}) => {
  return (
    <div className="table-responsive">
      <table className="table table-sm" id="table">
        <TableHeader
          sortColumn={sortColumn}
          onSort={onSort}
          refresh={refresh}
          headers={headers}
        />
        <TableBody data={data} isLoaded={isLoaded} handleClick={handleClick} />
      </table>
    </div>
  );
};

export default Table;
