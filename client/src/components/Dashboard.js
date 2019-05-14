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
                <a href="#">
                  <i class="far fa-list-alt" /> Dashboard
                </a>
              </span>
            </li>
            <li className="waves-effect">
              <span className="dash-icon">
                <a href="#">
                  <i class="fas fa-plane" /> My Trips
                </a>
              </span>
            </li>
            <li className="waves-effect">
              <span className="dash-icon">
                <a href="#">
                  <i class="far fa-save" /> Saved Trips
                </a>
              </span>
            </li>
            <TripsNew />
            <li className="waves-effect logout-dash">
              <span className="dash-icon">
                <a href="/api/logout">
                  <i class="fas fa-sign-out-alt" /> Logout
                </a>
              </span>
            </li>
          </ul>
        </div>
        <div className="dashboard">
          <div className="container">
            <h1>Dashboard</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
