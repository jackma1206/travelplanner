import React, { Component } from "react";
import * as actions from "../../actions";
import { connect } from "react-redux";
import TripEditForm from "./TripEditForm";
import TripDeets from "./tripDeets";

class TripEdit extends Component {
  // TODO
  // Take Id from url and find that post

  //render info of post already given

  //hook up google maps api
  constructor(props) {
    super(props);

    this.state = {
      edit: false
    };
  }

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchTrip(id);
  }
  //on click of button switch to edit form instead of viewing details
  //below that is itinerary show map +
  render() {
    return (
      <div className="container">
        {this.state.edit ? (
          <TripEditForm
            initialValues={this.props.trip}
            toggleEdit={this.toggleEdit}
          />
        ) : (
          <TripDeets data={this.props.trip} toggleEdit={this.toggleEdit} />
        )}
        <div>Lol</div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { auth: state.auth, trip: state.trips };
}
export default connect(
  mapStateToProps,
  actions
)(TripEdit);
