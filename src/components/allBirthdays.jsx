import React, { Component } from "react";
import Table from "../common/table";
import axios from "axios";
import Pagination from "../common/paging";
import paginate from "../utils/paginate";
import _ from "lodash";
class AllBirthdays extends Component {
  state = {
    artists: [],
    currentPage: 1,
    amountPerPage: 25,
    sortColumn: { path: "artist", order: "initial" }
  };

  componentDidMount() {
    axios.get(`http://localhost:4000/artist`).then(res => {
      const artists = res.data; //res.data is an array
      this.setState({ artists });
    });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handlePageNext = () => {
    let { currentPage } = this.state;
    currentPage += 1;
    this.setState({ currentPage });
  };

  handlePagePrevious = () => {
    let { currentPage } = this.state;
    currentPage -= 1;
    this.setState({ currentPage });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  lower = s => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toLowerCase() + s.slice(1);
  };

  capitalize = s => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  render() {
    const {
      artists: allArtists,
      currentPage,
      amountPerPage,
      sortColumn
    } = this.state;
    var sorted = { ...allArtists };
    var artists = paginate(allArtists, currentPage, amountPerPage);
    if (sortColumn.order !== "initial") {
      sorted = _.orderBy(allArtists, [sortColumn.path], [sortColumn.order]);
      artists = sorted;
    }
    const artistsLength = allArtists.length;
    return (
      <React.Fragment>
        <Table
          data={artists}
          sortColumn={sortColumn}
          onSort={this.handleSort}
        ></Table>
        <Pagination
          itemsCount={artistsLength}
          pageSize={amountPerPage}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
          onPageNext={this.handlePageNext}
          onPagePrevious={this.handlePagePrevious}
        />
      </React.Fragment>
    );
  }
}

export default AllBirthdays;
