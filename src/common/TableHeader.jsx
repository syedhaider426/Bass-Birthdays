import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = this.props.sortColumn;
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;

    if (column !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-arrow-up" />;
    return <i className="fa fa-arrow-down" />;
  };

  render() {
    var headers = this.props.headers;
    var emptyHeader;

    //used to have no header for the picture column
    if (this.props.headers[0] === "") {
      headers = this.props.headers.slice(1);
      emptyHeader = <th className="w-25"></th>;
    }
    return (
      <thead>
        <tr id="headers" className="headers">
          {emptyHeader}
          {headers.map(header => (
            <th
              onClick={() => this.raiseSort(header)}
              style={{ cursor: "pointer" }}
              key={header}
              className="w-25"
            >
              {header}
              {this.renderSortIcon(header)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
