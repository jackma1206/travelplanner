import React, { Component } from "react";
import TripCard from "./landing/card";
import * as actions from "../actions";
import { connect } from "react-redux";

class AllTrips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: []
    };
  }
  async componentDidMount() {
    await this.props.getAllTrips();
    this.setState({
      trips: this.props.trips
    });
    console.log(this.props.trips);
  }

  renderTrips() {
    return this.state.trips.map((trip, i) => {
      let href = `/view/${trip._id}`;
      return (
        <div className="col s4">
          <TripCard data={trip} href={href} key={trip.tripName} />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">{this.renderTrips()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, trips: state.trips };
}
export default connect(
  mapStateToProps,
  actions
)(AllTrips);
