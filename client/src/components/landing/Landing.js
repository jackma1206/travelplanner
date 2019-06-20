import React, { Component } from "react";
import "../../styles/landing.scss";
import FeaturedCard from "./card";
import {
  nyc_img,
  sf_img,
  paris_img,
  beijing_img,
  hawaii_img,
  toronto_img,
  data
} from "./images";

class Landing extends Component {
  renderFeaturedTrips() {
    return <div />;
  }
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
          <div className="container">
            <h3>Featured Trips</h3>
            <div className="row">
              <div className="col s4 ">
                <FeaturedCard data={data[0]} />
              </div>
              <div className="col s4">
                <FeaturedCard data={data[1]} />
              </div>
              <div className="col s4">
                <FeaturedCard data={data[2]} />
              </div>
            </div>
            <div className="row">
              <div className="col s4 ">
                <FeaturedCard data={data[3]} />
              </div>
              <div className="col s4">
                <FeaturedCard data={data[4]} />
              </div>
              <div className="col s4">
                <FeaturedCard data={data[5]} />
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="footer-content">
            <ul>
              <li>
                <a className="footer-icon" href="#">
                  <i className="fab fa-github" />
                </a>
              </li>
              <li>
                <a className="footer-icon" href="#">
                  <i className="fab fa-linkedin" />
                </a>
              </li>
              <li>
                <a className="footer-icon" href="#">
                  <i className="fab fa-github" />
                </a>
              </li>
            </ul>
            <p>Created By Jack Ma</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
