import React, { Component } from "react";
import Table from "../common/Table";
import paginate from "../utils/paginate";
import _ from "lodash";
import FilterTable from "./FilterTable";
import Pagination from "../common/Paging";
import "bootstrap/dist/js/bootstrap";
import { withRouter } from "react-router-dom";
import ScrollToTop from "../utils/scrollToTop";

var url;
if (process.env.NODE_ENV === "production")
  url = "https://bassbirthdays.com/artist";
else url = "http://localhost:8080/artist";

/* This component includes 3 separate components
 * -FilteredTable
   -Table
   -Pagination

 * This component shows all artists' birthdays in ascending order
 */

class AllBirthdays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
      currentPage: 1,
      amountPerPage: 25,
      sortColumn: { path: "Birthday", order: "asc" },
      searchQuery: "",
      bdayQuery: "",
      isLoaded: false
    };
  }

  componentDidMount() {
    document.getElementById("navbar").scrollIntoView();

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ artists: data, isLoaded: true });
      })
      .catch(err =>
        console.log("ComponentDidMount (AllBirthdays) - Error", err)
      );
  }

  /* If a user clicks on a page link',
   * it will jump to that page
   * 'Page' param is the page clicked.
   */
  handlePageChange = page => {
    const { currentPage } = this.state;
    if (currentPage === page) return;
    this.setState({ currentPage: page });
    ScrollToTop();
  };

  /* If a user clicks 'Next' or 'Previous',
   * it will either increment or decrement from the current page
   *
   * 'Change' param can only be 1 or -1.
   */
  handlePageButtonChange = change => {
    let { currentPage } = this.state;
    currentPage += change;
    this.setState({ currentPage });
    ScrollToTop();
  };

  /* Changes the column to sort by */
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  /* Refreshes the data on the table */
  refresh = e => {
    const searchQuery = "";
    const bdayQuery = "";
    const amountPerPage = 25; //look into default state values
    if (e.keyCode === 13 || e.keyCode === undefined)
      this.setState({
        sortColumn: { path: "Birthday", order: "asc" },
        searchQuery,
        bdayQuery,
        amountPerPage
      });
  };

  /* When a user types in any text, it will call this onChange function and filter the current results*/
  handleSearch = query => {
    //query is what is typed in
    //currentPage is set to 1 b/c if user is on page 3 when they search, they can't view page 1
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  /* When a user selects a birthday name, it will call this onChange function and filter the current results */
  handleBirthdayFilter = ({ target: bday }) => {
    this.setState({ bdayQuery: bday.value, currentPage: 1 });
  };

  /* User can choose 'n' number of records to show on the table at a time */
  handleSelect = ({ target: selected }) => {
    //selected.value returns a string
    this.setState({ amountPerPage: parseInt(selected.value), currentPage: 1 });
  };

  /* When a user clicks an artist's row, it will take the user to the artist's profile */
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

    /* Filters out the artists that include the specified letters */
    if (searchQuery)
      allArtists = allArtists.filter(m => {
        return m.Artist.toLowerCase().includes(searchQuery.toLowerCase());
      });

    /* Filters out the artists by the date/month */
    if (bdayQuery)
      allArtists = allArtists.filter(artist => {
        //birthdayQuery represents 2020/01/01
        //0-4 year
        //5-7 month
        //8-> date
        var month = bdayQuery.substring(5, 7);
        var date = bdayQuery.substring(8);

        var db = artist.Birthday.substring(0, 10);

        var date2 = db.substring(8);
        var month2 = db.substring(5, 7);

        if (month2 === month && date2 === date) return true;
        return false;
      });
    var sorted = {};

    //sorts data based on the sort column (artist or birthday or genre)
    sorted = _.orderBy(allArtists, [sortColumn.path], [sortColumn.order]);

    //paginates data into 9 pages
    var artists = paginate(sorted, currentPage, amountPerPage);

    const artistsLength = allArtists.length;
    const options = [25, 50, 75, 100];
    const headers = ["", "Artist", "Birthday", "Horoscope"];

    const {
      handleSearch,
      handleBirthdayFilter,
      refresh,
      handleSelect,
      handleSort,
      handleClick,
      handlePageChange,
      handlePageButtonChange
    } = this;

    return (
      <React.Fragment>
        <h1 className="title" id="all-birthdays">
          All Birthdays
        </h1>
        <hr></hr>
        <FilterTable
          searchQuery={searchQuery}
          bdayQuery={bdayQuery}
          onChange={handleSearch}
          handleBirthday={handleBirthdayFilter}
          refresh={refresh}
          options={options}
          handleSelect={handleSelect}
        />
        <div className="pre-scrollable">
          <Table
            data={artists}
            sortColumn={sortColumn}
            onSort={handleSort}
            headers={headers}
            isLoaded={isLoaded}
            handleClick={handleClick}
          />
        </div>
        {artistsLength > 5 && (
          <button
            type="btn"
            className="btn btn-primary"
            aria-label="Back to the Top of Table"
            title="Go back to the Top of the Birthdays Table"
            onKeyDown={e => {
              if (e.keyCode === 13) ScrollToTop();
            }}
            onClick={ScrollToTop}
          >
            Back to Top
          </button>
        )}
        <Pagination
          itemsCount={artistsLength}
          pageSize={amountPerPage}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          onPageNext={() => handlePageButtonChange(1)}
          onPagePrevious={() => handlePageButtonChange(-1)}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(AllBirthdays);
