import React, { Component } from "react";
import Table from "../common/table";
import axios from "axios";
import Pagination from "../common/paging";
import paginate from "../utils/paginate";

class AllBirthdays extends Component {
  state = {
    artists: [],
    currentPage: 1,
    amountPerPage: 25
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

  render() {
    const { artists: allArtists, currentPage, amountPerPage } = this.state;
    console.log("Render", currentPage);
    const artists = paginate(allArtists, currentPage, amountPerPage);

    const artistsLength = allArtists.length;
    console.log("artists length", artistsLength);
    return (
      <React.Fragment>
        <Table data={artists}></Table>
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
