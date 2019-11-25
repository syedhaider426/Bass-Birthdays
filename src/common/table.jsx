import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({ data, sortColumn, onSort }) => {
  return (
    <table className="table">
      <TableHeader sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} />
    </table>
  );
};

export default Table;
