import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/dashboard.scss";
import Sidebar from "./sidebar/sidebar";
import * as actions from "../actions";
import RenderTrip from "./dash/renderTrips";
import SavedTripCard from "./landing/card";
import Loader from "react-loader-spinner";
import { Collapsible, CollapsibleItem } from "react-materialize";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      faveTrips: [],
      activeTab: 0
    };
  }

  async componentDidMount() {
    await this.props.getTrips();

    this.setState({
      trips: this.props.trips
    });

    await this.props.getFaveTrips();
    this.setState({
      faveTrips: this.props.trips
    });
  }

  updateList = trip => {
    this.setState({
      trips: this.state.trips.concat(trip)
    });
  };

  getActiveTab = value => {
    this.setState({
      activeTab: value
    });
  };

  renderTrips() {
    if (!this.state.trips) {
      return (
        <div className="load-spinner">
          <Loader type="Plane" color="#00BFFF" height="25" width="25" />
        </div>
      );
    }
    return this.state.trips.reverse().map((trip, i) => {
      let href = `/dashboard/trips/${trip._id}`;
      return (
        <CollapsibleItem key={i} className="coll-item" header={trip.tripName}>
          <RenderTrip data={trip} href={href} addTrip={this.updateList} />
        </CollapsibleItem>
      );
    });
  }

  renderSavedTrips() {
    if (!this.state.faveTrips) {
      return (
        <div className="load-spinner">
          <Loader type="Plane" color="#00BFFF" height="25" width="25" />
        </div>
      );
    }
    return this.state.faveTrips.map((trip, i) => {
      let href = `/view/${trip._id}`;
      return (
        <div className="col s4">
          <SavedTripCard data={trip} href={href} key={trip._id} />
        </div>
      );
    });
  }

  renderDash = () => {
    switch (this.state.activeTab) {
      case null:
        return;
      case 0:
        return (
          <div className="">
            <h1>My Trips</h1>
            <div className="trips-wrapper">
              <Collapsible popout className="coll-wrapper">
                {this.renderTrips()}
              </Collapsible>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <h1>Saved Trips</h1>
            <div className="">
              <div className="row">{this.renderSavedTrips()}</div>
            </div>
          </div>
        );

      default:
        return <p>Loading</p>;
    }
  };

  render() {
    return (
      <React.Fragment>
        <Sidebar onChange={this.getActiveTab} />
        <div className="dashboard">
          <div className="container">{this.renderDash()}</div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, trips: state.trips };
}
export default connect(
  mapStateToProps,
  actions
)(Dashboard);
