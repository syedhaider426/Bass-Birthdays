import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({ data }) => {
  return (
    <table className="table table-dark">
      <TableHeader />
      <TableBody data={data} />
    </table>
  );
};

export default Table;
