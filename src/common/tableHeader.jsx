import React, { Component } from "react";

class TableHeader extends Component {
  state = {};
  render() {
    return (
      <thead>
        <tr>
          <th></th>
          <th>Artist</th>
          <th>Birthday</th>
        </tr>
      </thead>
    );
  }
}
export default TableHeader;
