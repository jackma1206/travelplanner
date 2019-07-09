import React, { Component } from "react";
import "../../styles/landing.scss";
import FeaturedCard from "./card";
import { connect } from "react-redux";
import LandingTripButton from "../trips/LandingTrip";
import * as actions from "../../actions";
import Loader from "react-loader-spinner";
import Footer from "../Footer";
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      featuredTrips: []
    };
  }

  async componentDidMount() {
    await this.props.getFeatured();
    this.setState({ featuredTrips: this.props.trips });
    console.log(this.state);
  }

  renderCTA() {
    switch (this.props.auth) {
      case null:
        return (
          <a className="dash-icon btn" href="/auth/google">
            PLAN A TRIP
          </a>
        );
      case false:
        return (
          <a className="dash-icon btn" href="/auth/google">
            PLAN A TRIP
          </a>
        );
      default:
        return <LandingTripButton text={"Plan a Trip"} />;
    }
  }

  renderFeatured() {
    if (!this.state.featuredTrips) {
      return (
        <div className="load-spinner">
          <Loader type="Plane" color="#00BFFF" height="25" width="25" />
        </div>
      );
    }
    return this.state.featuredTrips.map((trip, i) => {
      let href = `/view/${trip._id}`;
      return (
        <div className="col s4">
          <FeaturedCard data={trip} href={href} key={i} />
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="hero">
          <div className="hero-text">
            <h3>Plan. Share. Travel.</h3>
            <p>Create travel itineraries and share it with your friends!</p>
            <div className="hero-button">{this.renderCTA()}</div>
          </div>
        </div>
        <div className="featured-trips">
          <div className="container">
            <h3>Featured Trips</h3>
            <div className="row">{this.renderFeatured()}</div>
            <a href="/trips/all" className="btn center-align">
              View More
            </a>
          </div>
        </div>
        <Footer />
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
)(Landing);
