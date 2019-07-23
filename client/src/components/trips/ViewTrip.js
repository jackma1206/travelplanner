import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

import "../../styles/oneTrip.scss";
import Loader from "react-loader-spinner";
import PlaceList from "../map/ViewTripPlaceList";
import MapContainer from "../map/ViewTripMap";

class ViewTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: {},
      places: [],
      selectedItem: { lat: 0, lng: 0 },
      showInfo: false,
      isActive: ""
    };
  }
  async componentDidMount() {
    let { id } = this.props.match.params;
    await this.props.fetchTrip(id);
    this.setState({
      trip: this.props.trips,
      places: this.props.trips.thingsToDo || []
    });
  }

  renderLeadInfo() {
    if (!this.state.trip) {
      return (
        <div className="load-spinner">
          <Loader type="Plane" color="#00BFFF" height="25" width="25" />
        </div>
      );
    } else {
      const { trip } = this.state;
      const {
        image,
        description,
        tripName,
        dateCreated,
        toDe,
        thingsToDo,
        author
      } = trip;
      let tLength = 0;
      let toDest = "";
      if (thingsToDo) {
        tLength = thingsToDo.length;
        toDest = toDe;
      }

      console.log(toDe);
      return (
        <>
          <div className="banner">
            <img src={image} className="z-depth-3" alt="banner" />
          </div>
          <div className="lead">
            <h3 className="title">{tripName}</h3>
            <p>{description}</p>
            <span className="icon-text">
              <span className>
                <i className="fas fa-user" />
              </span>
              {author} |
            </span>
            <span className="icon-text">
              <span>
                <i className="fas fa-map-marker-alt" />
              </span>
              {tLength} |
            </span>
            <span className="icon-text">
              <span>
                <i className="fas fa-plane" />
              </span>
              {toDest.city}, {toDest.country} |
            </span>
            <span className="icon-text">
              <span>
                <i className="fas fa-clock" />
              </span>
              {dateCreated}
            </span>
          </div>
        </>
      );
    }
  }

  showInfo = selectedItem => {
    if (selectedItem !== this.state.selectedItem) {
      this.setState({
        selectedItem: selectedItem,
        showInfo: true,
        isActive: selectedItem.title
      });
    } else {
      this.setState({
        selectedItem: selectedItem,
        showInfo: !this.state.showInfo,
        isActive: ""
      });
    }
  };

  markerClick = (props, marker, e) => {
    let { places } = this.state;
    let temp = places[marker.id];
    this.showInfo(temp);
  };

  onMapClick = () => {
    if (this.state.showInfo) {
      this.setState({
        showInfo: false,
        isActive: ""
      });
    }
  };

  renderMap() {
    if (
      this.state.trip.location !== undefined &&
      this.state.trip.thingsToDo !== undefined
    ) {
      let long, lat;
      if (this.state.places.length) {
        long = this.state.places[0].lng;
        lat = this.state.places[0].lat;
      } else {
        long = this.state.trip.location.long;
        lat = this.state.trip.location.lat;
      }
      return (
        <div className="map-wrap-one z-depth-1">
          <MapContainer
            center={{
              lat: lat,
              lng: long
            }}
            zoom={10}
            data={this.state.places}
            selectedItem={this.state.selectedItem}
            showInfo={this.state.showInfo}
            markerClick={this.markerClick}
            onMapClick={this.onMapClick}
          />
          <PlaceList
            places={this.state.places}
            onClick={this.showInfo}
            isActive={this.state.isActive}
          />
        </div>
      );
    } else {
      return "loading";
    }
  }

  render() {
    console.log(this.state.trip);

    return (
      <div className="container wrapper">
        {this.renderLeadInfo()}
        {this.renderMap()}
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
