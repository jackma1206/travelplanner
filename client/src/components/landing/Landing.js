import React, { Component } from "react";
import "../../styles/landing.scss";
import FeaturedCard from "./card";

class Landing extends Component {
  render() {
    return (
      <div>
        <div className="hero">
          <div className="hero-text">
            <h3>Plan. Share. Travel.</h3>
            <p>Create travel itineraries and share it with your friends!</p>
          </div>
        </div>
        <div className="featured-trips">
          <h3>Featured Trips</h3>
          <div className="row">
            <div className="col s4 ">
              <FeaturedCard />
            </div>
            <div className="col s4">
              <FeaturedCard />
            </div>
            <div className="col s4">
              <FeaturedCard />
            </div>
          </div>
          <div className="row">
            <div className="col s4 ">
              <FeaturedCard />
            </div>
            <div className="col s4">
              <FeaturedCard />
            </div>
            <div className="col s4">
              <FeaturedCard />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
