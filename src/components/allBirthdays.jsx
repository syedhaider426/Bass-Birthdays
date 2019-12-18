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
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleBirthdayFilter = ({ currentTarget: bday }) => {
    this.setState({ bdayQuery: bday.value, currentPage: 1 });
  };

  handleSelect = ({ currentTarget: selected }) => {
    //selected.value returns a string
    this.setState({ amountPerPage: parseInt(selected.value), currentPage: 1 });
  };

  smoothScroll = () => {
    //window.scrollTo(0, 0);
    // scroll certain amounts from current position
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
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
    console.log("Initial artist length", allArtists.length);
    if (searchQuery)
      allArtists = allArtists.filter(m => {
        return m.artist.toLowerCase().includes(searchQuery.toLowerCase());
      });
    if (bdayQuery)
      allArtists = allArtists.filter(m => {
        var month = bdayQuery.substring(5, 7);
        var date = bdayQuery.substring(8);

        var db = m.birthday.substring(0, 10);

        var date2 = db.substring(8);
        var month2 = db.substring(5, 7);
        console.log(month + "/" + date);
        if (month2 == month && date2 == date) return true;
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
    console.log("Final artist length", artists.length);
    const artistsLength = allArtists.length;
    var options = [25, 50, 75, 100];
    /*container class for table affects bootstrap*/
    return (
      <React.Fragment>
        <div className="main-content">
          <div className="container">
            <div className="row birthday-filter">
              <FilterTable
                value={searchQuery}
                onChange={this.handleSearch}
                handleBirthday={this.handleBirthdayFilter}
                refresh={this.refresh}
              />
              <div className="form-inline">
                <Select
                  name={"Records Per Page"}
                  value={amountPerPage}
                  options={options}
                  onChange={this.handleSelect}
                />
                <label className="records-label">Records Per Page</label>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <Table
                data={artists}
                sortColumn={sortColumn}
                onSort={this.handleSort}
              />
            </div>
          </div>

          <div className="container">
            <div className="row">
              <Pagination
                itemsCount={artistsLength}
                pageSize={amountPerPage}
                onPageChange={this.handlePageChange}
                currentPage={currentPage}
                onPageNext={this.handlePageNext}
                onPagePrevious={this.handlePagePrevious}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AllBirthdays;
