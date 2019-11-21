import React, { Component } from "react";
import Table from "../common/table";
import axios from "axios";
import Pagination from "../common/paging";
class AllBirthdays extends Component {
  state = {
    artists: []
  };

  componentDidMount() {
    axios.get("http://localhost:4000/artist").then(res => {
      const artists = res.data; //res.data is an array
      this.setState({ artists });
    });
  }
  render() {
    const { artists } = this.state;

    return (
      <React.Fragment>
        <Table data={artists}></Table>
        <Pagination />
      </React.Fragment>
    );
  }
}

export default AllBirthdays;
