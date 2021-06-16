import React, { Component, Fragment } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Input from "../common/Input";

/* Sourced from https://alligator.io/react/react-autocomplete/ */

interface IProps extends RouteComponentProps {
  //code related to your props goes here
}
interface AppState {
  activeSuggestion: number;
  filteredSuggestions: string[];
  allSuggestions: string[];
  showSuggestions: boolean;
  userInput: string;
}

class AutoComplete extends Component<IProps, AppState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // All suggestions passed in from componentDidMount
      allSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: "",
    };
  }

  componentDidMount(): void {
    //url is a global variable
    fetch("/artistOnly")
      .then((response) => response.json())
      .then((data) => {
        var arr = [];
        //Gets an array of objects and converts it into an array of strings
        for (var x = 0; x < data.length; x++) {
          arr.push(data[x].Artist);
        }
        this.setState({ allSuggestions: arr });
      });
  }

  // Event fired when the input value is changed
  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { allSuggestions: suggestions }: { allSuggestions: string[] } =
      this.state;
    const userInput: string = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value,
    });
  };

  // Event fired when the user clicks on a suggestion
  onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
    });
  };

  // Event fired when the user presses a key down
  onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.key === "13") {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion],
      });
      this.handleSubmit(e);
    }
    // User pressed the up arrow, decrement the index
    else if (e.key === "38") {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.key === "40") {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  // When the user has entered a value, it will redirect user to artist's profile page
  handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    document.body.style.cursor = "wait"; //wait cursor until page is redirected
    let { userInput: artist } = this.state; //gets the textbox's value
    artist = artist.trim();

    fetch(`/artistOnly?artist=${artist}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          this.props.history.push("/not-found");
          return;
        }
        //must declare {this.state.autoComplete} as value for input
        this.setState({
          activeSuggestion: 1,
          showSuggestions: true,
          userInput: "",
        });

        /* If the user enters in an Artist whose page they already have open, then just reload the page
         * Ex) User selected Bassnectar. They search for Bassnectar and hit enter. This will reload the page
         */
        let currentPath: string = this.props.history.location.pathname //gets the current pathname
          .substring(9)
          .toLowerCase();

        //Compares current path with the artist selected in Autocomplete; reloads if true
        if (currentPath === artist.toLowerCase().trim()) {
          window.location.reload();
        }
        this.props.history.push("/profile/" + artist);
      });
  };

  render() {
    const { onChange, onClick, onKeyDown } = this;

    const {
      activeSuggestion,
      filteredSuggestions,
      showSuggestions,
      userInput,
    }: AppState = this.state;

    let suggestionsListComponent: JSX.Element = <ul></ul>;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length > 0) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;
              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }
              return (
                <li
                  className={className}
                  key={suggestion}
                  onClick={() => onClick}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      }
    }

    return (
      <Fragment>
        <form className="autocomplete-form" onSubmit={this.handleSubmit}>
          <div className="input-group autocomplete">
            <Input
              autoFocus={true}
              name="autocomplete"
              value={userInput || ""}
              placeholder="Search..."
              type="search"
              onChange={onChange}
              onKeyDown={onKeyDown}
              ariaLabel="Search"
            />
            {suggestionsListComponent}
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="submit"
                title="Search for an artist or group"
                aria-label="Search for Artists"
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default withRouter(AutoComplete);
