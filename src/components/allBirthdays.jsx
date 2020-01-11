import React, { Component } from "react";
import Table from "../common/table";
import paginate from "../utils/paginate";
import _ from "lodash";
import FilterTable from "./filterTable";
import Pagination from "../common/paging";
import Select from "../common/select";
import "bootstrap/dist/js/bootstrap";
import { withRouter } from "react-router-dom";

function scrollToTop() {
  document.getElementById("table").scrollIntoView();
}

class AllBirthdays extends Component {
  state = {
    artists: [],
    currentPage: 1,
    amountPerPage: 25,
    sortColumn: { path: "Birthday", order: "asc" },
    searchQuery: "",
    bdayQuery: "",
    isLoaded: false
  };

  componentDidMount() {
    document.getElementById("navbar").scrollIntoView();
    var url;
    if (process.env.NODE_ENV === "production")
      url = "https://dubstepdata.info/artist";
    else url = "http://localhost:8080/artist";
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ artists: data, isLoaded: true });
      });
  }

  handlePageChange = page => {
    const { currentPage } = this.state;
    if (currentPage === page) return;
    this.setState({ currentPage: page });
    scrollToTop();
  };

  handlePageNext = () => {
    let { currentPage } = this.state;
    currentPage += 1;
    this.setState({ currentPage });
    scrollToTop();
  };

  handlePagePrevious = () => {
    let { currentPage } = this.state;
    currentPage -= 1;
    this.setState({ currentPage });
    scrollToTop();
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

  handleBirthdayFilter = ({ target: bday }) => {
    this.setState({ bdayQuery: bday.value, currentPage: 1 });
  };

  handleSelect = ({ target: selected }) => {
    //selected.value returns a string
    this.setState({ amountPerPage: parseInt(selected.value), currentPage: 1 });
  };
  handleClick = artist => {
    this.props.history.push("/profile/" + artist);
  };

  render() {
    let {
      artists: allArtists,
      currentPage,
      amountPerPage,
      sortColumn,
      searchQuery,
      bdayQuery,
      isLoaded
    } = this.state;

    if (searchQuery)
      allArtists = allArtists.filter(m => {
        return m.Artist.toLowerCase().includes(searchQuery.toLowerCase());
      });
    if (bdayQuery)
      allArtists = allArtists.filter(m => {
        var month = bdayQuery.substring(5, 7);
        var date = bdayQuery.substring(8);

        var db = m.Birthday.substring(0, 10);

        var date2 = db.substring(8);
        var month2 = db.substring(5, 7);

        if (month2 === month && date2 === date) {
          return true;
        }
        return false;
      });
    var sorted = {};

    //sorts data based on the sort column (artist or birthday or genre)
    sorted = _.orderBy(allArtists, [sortColumn.path], [sortColumn.order]);

    //paginates data into 9 pages
    var artists = paginate(sorted, currentPage, amountPerPage);
    const artistsLength = allArtists.length;
    var options = [25, 50, 75, 100];
    var headers = ["", "Artist", "Birthday", "Genre"];

    return (
      <React.Fragment>
        <h1 className="title" id="all-birthdays">
          All Birthdays
        </h1>
        <hr></hr>
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
        <div className="row pre-scrollable">
          <Table
            data={artists}
            sortColumn={sortColumn}
            onSort={this.handleSort}
            headers={headers}
            isLoaded={isLoaded}
            handleClick={this.handleClick}
          />
        </div>
        <div className="row">
          {" "}
          {artistsLength > 5 && (
            <button
              type="btn"
              className="btn btn-primary "
              onClick={scrollToTop}
            >
              Back to Top
            </button>
          )}
        </div>
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
      </React.Fragment>
    );
  }
}

export default withRouter(AllBirthdays);
