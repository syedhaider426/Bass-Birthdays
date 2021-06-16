import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

/* Reusable Table Component
 *   -Consists of TableHeader and TableBody components
 */

type ArtistType = {
  _id: string;
  Artist: string;
  Birthday: string;
  ProfileImage: string;
  Horoscope: string;
};

type TTableProps = {
  data: ArtistType[];
  sortColumn: { path: string; order: "asc" | "desc" };
  headers: string[];
  isLoaded: boolean;
  onSort: (sortColumn: { path: string; order: "asc" | "desc" }) => void;
  handleClick: (artist: string) => void;
};

const Table: React.FC<TTableProps> = ({
  data,
  sortColumn,
  headers,
  isLoaded,
  onSort,
  handleClick,
}): JSX.Element => {
  return (
    <div className="table-responsive">
      <table className="table table-sm all-birthdays-table" id="table">
        <TableHeader
          sortColumn={sortColumn}
          onSort={onSort}
          headers={headers}
        />
        <TableBody data={data} isLoaded={isLoaded} handleClick={handleClick} />
      </table>
    </div>
  );
};

export default Table;
