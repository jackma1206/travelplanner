/*global google*/

import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.autocomplete = null;

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  handlePlaceChanged = () => {
    const place = this.autocomplete.getPlace();
    // this.props.onPlaceChanged(place);
    console.log("here");
    console.log(place);
  };
  fetchPlaces = (mapProps, map) => {
    const { google } = mapProps;
    const input = document.getElementById("autocomplete");
    this.autocomplete = new google.maps.places.Autocomplete(input, {
      types: ["geocode"]
    });
    this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
  };

  render() {
    if (!this.props.google) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container">
        <div
          style={{
            position: "relative",
            height: "400px",
            width: "400px",
            border: "1px solid black"
          }}
        >
          <Map
            style={{}}
            google={this.props.google}
            zoom={10}
            onReady={this.fetchPlaces}
          >
            <Marker
              onClick={this.onMarkerClick}
              position={{ lat: 37.8079996, lng: -122.4177434 }}
              name={"Fisherman's Wharf"}
            />
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
            </InfoWindow>
          </Map>
        </div>
        <div
          className="searchbox"
          style={{
            position: "absolute",
            top: "0",
            marginLeft: "400px",
            padding: "10px 10px"
          }}
        >
          <input
            type="text"
            id="autocomplete"
            ref={this.autocompleteInput}
            placeholder="enter a location"
          />
        </div>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyDV-tIHfpVy5iOFb1ujtc0Lxv9QClCNeaw",
  v: "3.30"
})(MapContainer);
