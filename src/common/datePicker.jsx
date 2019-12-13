import React, { Component } from "react";

class DatePicker extends Component {
  state = {};
  render() {
    return (
      <div
        className="input-append date"
        id="datepicker"
        data-date="02-2012"
        data-date-format="mm-yyyy"
      >
        <input
          type="date"
          name="birthday"
          id="birthday"
          className=" form-control"
          onChange={handleBirthday}
          placeholder="Enter Birthday"
        ></input>
        <span class="add-on">
          <i class="icon-th"></i>
        </span>
      </div>
    );
  }
}

export default DatePicker;
