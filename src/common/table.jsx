import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

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
    <React.Fragment>
      <div className="table-responsive">
        <table className="table table-sm" id="table">
          <TableHeader
            sortColumn={sortColumn}
            onSort={onSort}
            refresh={refresh}
            headers={headers}
          />
          <TableBody
            data={data}
            isLoaded={isLoaded}
            handleClick={handleClick}
          />
        </table>
      </div>
    </React.Fragment>
  );
};

export default Table;
