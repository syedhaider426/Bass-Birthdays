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
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          <th
            onClick={() => this.raiseSort("artist")}
            style={{ cursor: "pointer" }}
          >
            Artist{this.renderSortIcon("artist")}
          </th>
          <th>Birthday</th>
          <th>Socials</th>
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
