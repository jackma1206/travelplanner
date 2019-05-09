import React, { Component } from "react";
import TripsNew from "./trips/TripsNew";
import "../styles/dashboard.scss";
class Dashboard extends Component {
  render() {
    return (
      <div className="">
        <div className="sidebar">
          <ul>
            <li className="waves-effect">
              <span className="dash-icon">
                <i class="far fa-list-alt" />
              </span>
              Dashboard
            </li>
            <li className="waves-effect">
              <span className="dash-icon">
                <i class="fas fa-plane" />
              </span>
              My Trips
            </li>
            <li className="waves-effect">
              <span className="dash-icon">
                <i class="far fa-save" />
              </span>
              Saved Trips
            </li>
            <TripsNew />
            <li className="waves-effect logout-dash">
              <span className="dash-icon">
                <i class="fas fa-sign-out-alt" />
              </span>
              <a href="/api/logout">Logout</a>
            </li>
          </ul>
        </div>
        <div className="container">
          <h1>Dashboard</h1>
        </div>
      </div>
    );
  }
}

export default Dashboard;
