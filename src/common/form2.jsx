import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

/*Form can have properties of the controls on the browser page*/
/*State can be dynamic based on controls being created*/

/*Birthday, so date picker is needed*/
/*Phone Number*/
/*Socials object: facebook, instagram, soundcloud, twitter, spotify, bandcamp, personal website */
/*approved field, date field database value*/
/*Change name to ARTIST*/
/*Validate if artist exists by making the arist input a searchable dropdown*/
/*if artist is selected, go to their page*/
class Form extends Component {
  state = {
    name: "",
    email: "",
    birthday: "",
    phoneNumber: "",
    comments: "",
    socials: {
      facebook: "",
      instagram: "",
      soundcloud: "",
      twitter: "",
      spotify: "",
      bandcamp: ""
    }
  };

  handleName = ({ currentTarget: input }) => {
    this.setState({ name: input.value });
  };

  handleEmail = ({ currentTarget: input }) => {
    this.setState({ email: input.value });
  };

  handleComments = ({ currentTarget: input }) => {
    this.setState({ comments: input.value });
  };

  handleBirthday = ({ currentTarget: input }) => {
    this.setState({ birthday: input.value });
  };

  handlePhoneNumber = ({ currentTarget: input }) => {
    this.setState({ phoneNumber: input.value });
  };

  //still not sure what currentarget is
  handleSocials = ({ currentTarget: input }) => {
    const socials = { ...this.state.socials }; //this creates a copy of the object and stores it in a new variable()
    //input.value refers to the value prop in the html tag for input
    socials[input.name] = input.value; //input.name refers to the actual input element in the render function. this means there must be a name property in the html tag for input
    this.setState({ socials });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      name,
      email,
      comments,
      socials,
      birthday,
      phoneNumber
    } = this.state;
    //also submit the date
    const obj = {
      name,
      birthday,
      phoneNumber,
      email,
      comments,
      socials
    };
    axios
      .post("http://localhost:4000/birthday", obj)
      .then(() => {
        this.props.history.push("/all");
      })
      .catch(err => console.log("Error", err));
    this.setState({
      name: "",
      email: "",
      comments: "",
      socials: {
        facebook: "",
        instagram: "",
        soundcloud: "",
        twitter: "",
        spotify: "",
        bandcamp: ""
      }
    });
  };
  render() {
    const {
      name,
      email,
      birthday,
      phoneNumber,
      comments,
      socials
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            autoFocus
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={name}
            onChange={this.handleName}
            placeholder="Enter Name"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="birthday">Birthday</label>
          <input
            type="date"
            name="birthday"
            id="birthday"
            className="form-control"
            value={birthday}
            onChange={this.handleBirthday}
            placeholder="Enter Birthday"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            className="form-control"
            value={email}
            onChange={this.handleEmail}
            placeholder="Enter email"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="facebook">Facebook</label>
          <input
            type="text"
            name="facebook"
            id="facebook"
            className="form-control"
            value={socials["facebook"]}
            onChange={this.handleSocials}
            placeholder="Enter Facebook URL"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="soundcloud">SoundCloud</label>
          <input
            type="text"
            name="soundcloud"
            id="soundcloud"
            className="form-control"
            value={socials["soundcloud"]}
            onChange={this.handleSocials}
            placeholder="Enter SoundCloud URL"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="instagram">Instagram</label>
          <input
            type="text"
            name="instagram"
            id="instagram"
            className="form-control"
            value={socials["instagram"]}
            onChange={this.handleSocials}
            placeholder="Enter Instagram URL"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            name="twitter"
            id="twitter"
            className="form-control"
            value={socials["twitter"]}
            onChange={this.handleSocials}
            placeholder="Enter Twitter URL"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="spotify">Spotify</label>
          <input
            type="text"
            name="spotify"
            id="spotify"
            className="form-control"
            value={socials["spotify"]}
            onChange={this.handleSocials}
            placeholder="Enter Spotify URL"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="bandcamp">Bandcamp</label>
          <input
            type="text"
            name="bandcamp"
            id="bandcamp"
            className="form-control"
            value={socials["bandcamp"]}
            onChange={this.handleSocials}
            placeholder="Enter Bandcamp URL"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="personal">Personal</label>
          <input
            type="text"
            name="personal"
            id="personal"
            className="form-control"
            value={socials["personal"]}
            onChange={this.handleSocials}
            placeholder="Enter Personal URL"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="comments">Comments</label>
          <textarea
            type="text"
            id="comments"
            className="form-control"
            value={comments}
            onChange={this.handleComments}
            placeholder="Enter comments"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default withRouter(Form);

/*htmlFor
Now when the user clicks with the mouse on the username text the browser will automatically put the focus in the corresponding input field. This also works with other input elements such as <textbox> and <select>.
*/
