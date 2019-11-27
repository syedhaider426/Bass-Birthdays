import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({ data, sortColumn, onSort, refresh }) => {
  return (
    <div className="div-all-table">
      <table className="all-birthday-table">
        <TableHeader
          sortColumn={sortColumn}
          onSort={onSort}
          refresh={refresh}
        />
        <TableBody data={data} />
      </table>
    </div>
  );
};

export default Table;
