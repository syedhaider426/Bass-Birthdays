import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({ data, sortColumn, onSort, refresh }) => {
  return (
    <table className="table w-auto">
      <TableHeader sortColumn={sortColumn} onSort={onSort} refresh={refresh} />
      <TableBody data={data} />
    </table>
  );
};

export default Table;
