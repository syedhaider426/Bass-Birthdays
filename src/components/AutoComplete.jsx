import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import Input from "../common/Input";

var url;
if (process.env.NODE_ENV === "production")
  url = new URL("https://dubstepdata.info/artistOnly");
else url = new URL("http://localhost:8080/artistOnly");

/* Sourced from https://alligator.io/react/react-autocomplete/ */

class AutoComplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };
  }

  // Event fired when the input value is changed
  onChange = ({ target: input }) => {
    const { filteredSuggestions: suggestions } = this.state;
    const userInput = input.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(userInput.toLowerCase())
    );

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: input.value
    });
  };

  // Event fired when the user clicks on a suggestion
  onClick = ({ target: input }) => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: input.innerText
    });
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  // When the user has entered a value, it will redirect user to artist's profile page
  handleSubmit = e => {
    e.preventDefault();
    document.body.style.cursor = "wait"; //wait cursor until page is redirected
    const { userInput: artist } = this.state; //gets the textbox's value
    var params = { artist: artist };
    url.search = new URLSearchParams(params).toString();

    fetch(url)
      .then(response => response.json())
      .then(data => {
        document.body.style.cursor = "default";
        if (data.length === 0) {
          this.props.history.push("/not-found");
          return;
        }
        this.setState({ userInput: "" }); //must declare {this.state.autoComplete} as value for input
        this.props.history.push("/profile/" + artist);
      });
  };

  componentDidMount() {
    //url is a global variable
    fetch(url)
      .then(response => response.json())
      .then(data => {
        var arr = [];
        //Gets an array of objects and converts it into an array of strings
        for (var x = 0; x < data.length; x++) {
          arr.push(data[x].Artist);
        }
        this.setState({ filteredSuggestions: arr });
      });
  }

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

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
                <li className={className} key={suggestion} onClick={onClick}>
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
              id="autocomplete"
              name="autocomplete"
              value={userInput}
              placeholder="Search..."
              type="search"
              onChange={onChange}
              onKeyDown={onKeyDown}
            />
            {suggestionsListComponent}
            <div className="input-group-append">
              <button className="btn btn-primary" type="submit">
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
