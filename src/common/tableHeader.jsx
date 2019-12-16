import React, { Component } from "react";

// columns: array
// sortColumn: obj
// onSort: function

class TableHeader extends Component {
  raiseSort = column => {
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === column)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = column;
      sortColumn.order = "initial";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (sortColumn.order === "asc") return <i className="fa fa-arrow-down"></i>;
    return <i className="fa fa-arrow-down open"></i>;
  };

  render() {
    return (
      <thead>
        <tr className="headers">
          <th className="h-picture"></th>
          <th
            onClick={() => this.raiseSort("artist")}
            style={{ cursor: "pointer" }}
            className="h-artist"
          >
            Artist{this.renderSortIcon("artist")}
          </th>
          <th className="h-birthday">
            Birthday{this.renderSortIcon("birthday")}
          </th>
          <th className="h-genre">Genres</th>
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
