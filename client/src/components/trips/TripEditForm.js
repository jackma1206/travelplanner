import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import renderDatePicker from "./renderDatePicker";
import renderDestination from "./renderDestination";
import moment from "moment";
import "../../styles/tripForm.scss";
import { airports } from "./airportsList";
import renderInput from "./renderInput";

class TripEditForm extends Component {
  //Create new field to search locations based on name

  //combine places autocomplete with geocoding????

  //push it to db as they add locations with price?

  //show their newly added location with every push

  //show map on detail page
  render() {
    const { handleSubmit, submitting, pristine } = this.props;

    return (
      <div className="formContainer-edit">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col s12">
              <Field
                component={renderInput}
                label="Trip Name"
                type="text"
                name="tripName"
              />
            </div>
          </div>
          <div className="row">
            <div className="col s6">
              <Field
                component={renderDestination}
                label="From"
                type="text"
                name="fromDest"
                data={airports}
              />
            </div>

            <div className="col s6">
              <Field
                component={renderDestination}
                label="To"
                type="text"
                name="toDest"
                data={airports}
              />
            </div>
          </div>
          <div className="row">
            <div className="col s3">
              <Field
                component={renderDatePicker}
                name="departDate"
                label="Depart Date"
                normalize={value =>
                  value ? moment(value).format("MM-DD-YYYY") : null
                }
                inputValueFormat="MM-DD-YYYY"
              />
            </div>

            <div className="col s3 ">
              <Field
                component={renderDatePicker}
                name="returnDate"
                label="Return Date"
                normalize={value =>
                  value ? moment(value).format("MM-DD-YYYY") : null
                }
                inputValueFormat="MM-DD-YYYY"
              />
            </div>

            <div className="col s3">
              <Field
                component={renderInput}
                label="Flight Cost"
                name="flightCost"
                type="text"
              />
            </div>

            <div className="col s3">
              <Field
                component={renderInput}
                type="text"
                label="Travelers"
                name="numPeople"
              />
            </div>
          </div>

          <button
            className="waves-effect waves-light btn right"
            onClick={this.props.toggleEdit}
          >
            Cancel
          </button>
          <button
            className="waves-effect waves-light btn right submit-button"
            type="submit"
            disabled={pristine || submitting}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
const validate = values => {
  const errors = {};
  if (!values.tripName) {
    errors.tripName = "Please name your trip";
  }
  if (!values.fromDest) {
    errors.fromDest = "Required";
  }
  if (!values.toDest) {
    errors.toDest = "Required";
  }
  if (!values.departDate) {
    errors.departDate = "Required";
  }
  if (!values.returnDate) {
    errors.returnDate = "Required";
  }
  if (!values.flightCost) {
    errors.flightCost = "Required";
  } else if (isNaN(values.flightCost)) {
    errors.flightCost = "Please use a number";
  }
  if (!values.numPeople) {
    errors.numPeople = "Required";
  } else if (isNaN(values.numPeople)) {
    errors.numPeople = "Please use a number";
  }
  let dNow = new Date();
  let d1 = Date.parse(values.departDate);
  let d2 = Date.parse(values.returnDate);
  if (d1 > d2 || dNow > d1) {
    errors.departDate = "Travel dates invalid";
    errors.returnDate = "Travel dates invalid";
  }

  return errors;
};

export default reduxForm({
  form: "tripEditForm",
  destroyOnUnmount: false,
  validate,
  enableReinitialize: true
})(TripEditForm);
