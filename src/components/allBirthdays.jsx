import React, { Component } from "react";
import Table from "../common/table";
import paginate from "../utils/paginate";
import _ from "lodash";
import FilterTable from "./filterTable";
import Pagination from "../common/paging";
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

  //"http://localhost:8080/artist"
  componentDidMount() {
    var url;
    if (process.env.NODE_ENV == "production")
      url = "https://dubstepdata.info/artist";
    else url = "http://localhost:8080/artist";
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ artists: data });
      });
  }

  handlePageChange = page => {
    const { currentPage } = this.state;
    if (currentPage === page) return;
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
    const searchQuery = "";
    const bdayQuery = "";
    const amountPerPage = 25; //look into default state values
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
    window.scrollTo(0, 0);
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
        console.log(bdayQuery);
        return m.birthday.substring(0, 10).startsWith(bdayQuery);
      });
    var sorted = {};
    if (sortColumn.order !== "initial") {
      sorted = _.orderBy(
        allArtists,
        [artistName => artistName[sortColumn.path].toLowerCase()],
        [sortColumn.order]
      );
      allArtists = sorted;
    }
    var artists = paginate(allArtists, currentPage, amountPerPage);
    const artistsLength = allArtists.length;
    var options = [25, 50, 75, 100];
    return (
      <React.Fragment>
        <div className="main-content">
          <div className="container search-query">
            <div className="row">
              <div className="col-sm-12">
                <FilterTable
                  value={searchQuery}
                  onChange={this.handleSearch}
                  handleBirthday={this.handleBirthdayFilter}
                  refresh={this.refresh}
                />
              </div>
            </div>
          </div>

          <div className="container mt-2">
            <div className="row">
              <div className="col-sm-12 birthday-table ">
                <Table
                  data={artists}
                  sortColumn={sortColumn}
                  onSort={this.handleSort}
                />
              </div>
            </div>
          </div>

          <div className="container mt-4 pr">
            <div className="row">
              <div className="col-sm-12 paging-records">
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
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AllBirthdays;
