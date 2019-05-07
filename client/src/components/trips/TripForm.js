import React from "react";
import { Field, reduxForm } from "redux-form";
import renderDatePicker from "./renderDatePicker";
import renderDestination from "./renderDestination";
import moment from "moment";
import "../../styles/tripForm.scss";
import { airports } from "./airportsList";
import renderInput from "./renderInput";

const TripForm = ({ handleSubmit, submitting, value }) => {
  return (
    <div className="formContainer">
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
            <Field component={renderInput} type="text" label="Travelers" name="numPeople" />
          </div>
        </div>
        <button
          className="waves-effect waves-light btn right"
          type="submit"
          disabled={submitting}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

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
  }
  if (!values.numPeople) {
    errors.numPeople = "Required";
  }
  let d1 = Date.parse(values.departDate);
  let d2 = Date.parse(values.returnDate);
  if(d1 > d2){
      errors.departDate = "Travel dates invalid";
      errors.returnDate = "Travel dates invalid"
  }

  return errors;
};

export default reduxForm({
  form: "tripForm",
  destroyOnUnmount: false,
  validate
})(TripForm);
