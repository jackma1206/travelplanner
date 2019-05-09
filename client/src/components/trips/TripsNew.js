import React, { Component } from "react";
import { reduxForm } from "redux-form";
import TripForm from "./TripForm";
import { connect } from "react-redux";
import * as actions from "../../actions";
import ReactModal from "react-modal";
import "../../styles/tripForm.scss";

class TripsNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  handleModalOpen = () => {
    this.setState({ showModal: true });
  };

  handleModalClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div>
        <li className="waves-effect" onClick={this.handleModalOpen}>
          <span className="dash-icon">
            <i class="fas fa-plus-circle" />
          </span>
          Add Trip
        </li>
        <ReactModal
          isOpen={this.state.showModal}
          closeTimeoutMS={600}
          contentLabel="New Trip Form"
          className="myModal"
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,.6)"
            }
          }}
        >
          <div className="modal-header">
            <h3>Add a new trip</h3>
            <span onClick={this.handleModalClose}>
              <i className="fa fa-times" />
            </span>
          </div>

          <TripForm onSubmit={values => this.props.submitTrip(values)} />
        </ReactModal>
      </div>
    );
  }
}

TripsNew = connect(
  null,
  actions
)(TripsNew);
export default reduxForm({ form: "tripForm" })(TripsNew);
