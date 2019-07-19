import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Landing from "./landing/Landing";
import Header from "./Header";
import Dashboard from "./Dashboard";
import TripDetails from "./trips/TripDetails";
import AllTrips from "./AllTrips";
import ViewTrip from "./trips/ViewTrip";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route path="/" exact component={Landing} />
            <Route path="/trips/all" exact component={AllTrips} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/dashboard/trips/:id" exact component={TripDetails} />
            <Route path="/view/:id" exact component={ViewTrip} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
