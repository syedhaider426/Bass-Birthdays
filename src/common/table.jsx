import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({ data, sortColumn, onSort, refresh }) => {
  return (
    <div class="table-responsive">
      <table className="table table-bordered w-auto">
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
