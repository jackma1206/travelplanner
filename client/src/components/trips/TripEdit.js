import React, { Component } from "react";
import * as actions from "../../actions";
import { connect } from "react-redux";
import TripEditForm from "./TripEditForm";

class TripEdit extends Component {
  // TODO
  // Take Id from url and find that post

  //render info of post already given

  //hook up google maps api
  constructor(props) {
    super(props);

    this.state = {
      initValues: {}
    };
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.fetchTrip(id);
  }

  render() {
    return (
      <div className="container">
        <TripEditForm initialValues={this.props.trip} />
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
