import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/dashboard.scss";
import Sidebar from "./sidebar/sidebar";
import * as actions from "../actions";
import TripDetail from "./dash/tripDetail";

// import M from "materialize-css";
import { Collapsible, CollapsibleItem } from "react-materialize";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };
  }
  componentWillMount() {
    this.props.getTrips();
  }

  getActiveTab = value => {
    this.setState({
      activeTab: value
    });
  };

  renderTrips() {
    return this.props.trips.reverse().map((trip, i) => {
      let href = `/dashboard/trips/${trip._id}`;
      return (
        <CollapsibleItem key={i} className="coll-item" header={trip.tripName}>
          <TripDetail data={trip} href={href} />
        </CollapsibleItem>
      );
    });
  }
  renderDash = () => {
    switch (this.state.activeTab) {
      case null:
        return;
      case 0:
        return (
          <Collapsible popout className="coll-wrapper">
            {this.renderTrips()}
          </Collapsible>
        );
      case 1:
        return (
          <div>
            <h1>My Trips</h1>
            {this.renderTrips()}
          </div>
        );

      case 2:
        return <h3>Bruh</h3>;
      default:
        return <p>Loading</p>;
    }
  };

  render() {
    return (
      <div>
        <Sidebar onChange={this.getActiveTab} />
        <div className="dashboard">
          <div className="container">
            <h1>Dashboard</h1>
            {this.renderDash()}
          </div>
        </div>
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
)(Dashboard);
