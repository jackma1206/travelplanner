import React, { Component } from "react";
import { reduxForm } from "redux-form";
import TripForm from "./TripForm";
import { connect } from "react-redux";
import * as actions from "../../actions";
import ReactModal from "react-modal";
import "../../styles/tripForm.scss";
import { withRouter } from "react-router";

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

  handleModalClose = e => {
    e.stopPropagation();
    this.setState({ showModal: false });
  };

  closeAfterSubmit = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { history } = this.props;
    return (
      <div>
        <li className="waves-effect" onClick={this.handleModalOpen}>
          <span className="dash-icon">
            <i className="fas fa-plus-circle" /> {this.props.text}
          </span>
        </li>
        <ReactModal
          isOpen={this.state.showModal}
          closeTimeoutMS={600}
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.handleModalClose}
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

          <TripForm
            onSubmit={values => this.props.submitTrip(values, history)}
            closeAfterSubmit={this.closeAfterSubmit}
          />
        </ReactModal>
      </div>
    );
  }
}

TripsNew = connect(
  null,
  actions
)(withRouter(TripsNew));
export default reduxForm({ form: "tripForm" })(TripsNew);
