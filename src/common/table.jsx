import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";
import { TransitionGroup, CSSTransition } from "react-transition-group";
const Table = ({ data, sortColumn, onSort, refresh, headers, isLoaded }) => {
  return (
    <React.Fragment>
      <div className="table-responsive">
        <table className="table table-sm">
          <TableHeader
            sortColumn={sortColumn}
            onSort={onSort}
            refresh={refresh}
            headers={headers}
          />
          <TableBody data={data} isLoaded={isLoaded} />
        </table>
      </div>
    </React.Fragment>
  );
};

export default Table;
