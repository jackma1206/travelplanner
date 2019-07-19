import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import RenderTrip from "../dash/renderTrips";
import "../../styles/allTrip.scss";
class ViewTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: {},
      places: []
    };
  }
  async componentDidMount() {
    let { id } = this.props.match.params;
    await this.props.fetchTrip(id);
    this.setState({
      trip: this.props.trips,
      places: this.props.trips.thingsToDo || []
    });
    console.log(this.state.trip);
  }

  render() {
    const img = this.state.trip.image;
    const bannerStyle = {
      backgroundImage: `url(${img})`
    };
    return (
      <div className="container wrapper">
        <div className="banner" style={bannerStyle}>
          <RenderTrip data={this.state.trip} />
          {/* <img src={img} alt="banner" /> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, trips }) {
  return { auth, trips };
}

export default connect(
  mapStateToProps,
  actions
)(ViewTrip);
