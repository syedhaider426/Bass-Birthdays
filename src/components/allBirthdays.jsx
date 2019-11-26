import React, { Component } from "react";
import Table from "../common/table";
import axios from "axios";
import Pagination from "../common/paging";
import paginate from "../utils/paginate";
import _ from "lodash";
import FilterTable from "./filterTable";
import Select from "../common/select";
class AllBirthdays extends Component {
  state = {
    artists: [],
    currentPage: 1,
    amountPerPage: 25,
    sortColumn: { path: "artist", order: "initial" },
    searchQuery: "",
    bdayQuery: ""
  };

  componentDidMount() {
    axios.get(`http://localhost:4000/artist`).then(res => {
      const artists = res.data; //res.data is an array
      this.setState({ artists });
    });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
    this.smoothScroll();
  };

  handlePageNext = () => {
    let { currentPage } = this.state;
    currentPage += 1;
    this.setState({ currentPage });
    this.smoothScroll();
  };

  handlePagePrevious = () => {
    let { currentPage } = this.state;
    currentPage -= 1;
    this.setState({ currentPage });
    this.smoothScroll();
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  //LOOK INTO QUERY PARAMS
  refresh = () => {
    let { sortColumn } = { ...this.state };
    const searchQuery = "";
    const bdayQuery = "";
    const amountPerPage = 25;
    this.setState({
      sortColumn: { path: "artist", order: "initial" },
      searchQuery,
      bdayQuery,
      amountPerPage
    });
  };

  handleSearch = query => {
    //query is what is typed in
    //currentPage is set to 1 b/c if user is on page 3 when they search, they can't view page 1
    console.log("Query", query);
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleBirthdayFilter = ({ currentTarget: bday }) => {
    console.log(bday.value);
    this.setState({ bdayQuery: bday.value, currentPage: 1 });
  };

  handleSelect = ({ currentTarget: selected }) => {
    this.setState({ amountPerPage: selected.value, currentPage: 1 });
  };

  smoothScroll = () => {
    if (window.screen.width < 400)
      window.scrollTo({
        //top: 100, // could be negative value
        top: 50,
        behavior: "smooth"
      });
  };

  render() {
    let {
      artists: allArtists,
      currentPage,
      amountPerPage,
      sortColumn,
      searchQuery,
      bdayQuery
    } = this.state;

    if (searchQuery)
      allArtists = allArtists.filter(m => {
        return m.artist.toLowerCase().startsWith(searchQuery.toLowerCase());
      });
    if (bdayQuery)
      allArtists = allArtists.filter(m => {
        return m.birthday.substring(0, 10).startsWith(bdayQuery);
      });
    var sorted = {};
    if (sortColumn.order !== "initial") {
      sorted = _.orderBy(allArtists, [sortColumn.path], [sortColumn.order]);
      allArtists = sorted;
    }
    var artists = paginate(allArtists, currentPage, amountPerPage);

    const artistsLength = allArtists.length;
    var options = [25, 50, 75, 100];
    return (
      <React.Fragment>
        <FilterTable
          value={searchQuery}
          onChange={this.handleSearch}
          handleBirthday={this.handleBirthdayFilter}
          refresh={this.refresh}
        />
        <Table
          data={artists}
          sortColumn={sortColumn}
          onSort={this.handleSort}
        ></Table>
        <div class="fix">
          <Pagination
            itemsCount={artistsLength}
            pageSize={amountPerPage}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
            onPageNext={this.handlePageNext}
            onPagePrevious={this.handlePagePrevious}
          />
          <Select
            name={"Records Per Page"}
            value={amountPerPage}
            options={options}
            onChange={this.handleSelect}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default AllBirthdays;
