import React, { Component } from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import "../../styles/tripDetail.scss";
import OpenHours from "./OpenHours";

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.autocomplete = null;

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      selectedData: []
    };
  }

  setupAutocomplete = (mapProps, map) => {
    const { google } = mapProps;
    const input = document.getElementById("autocomplete");
    this.autocomplete = new google.maps.places.Autocomplete(input, {});
    this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
  };
  handlePlaceChanged = () => {
    const place = this.autocomplete.getPlace();
    let lat = place.geometry.location.lat();
    let lng = place.geometry.location.lng();
    console.log(place);
    let hours = [];
    if (place.opening_hours !== undefined) {
      hours = place.opening_hours.weekday_text;
    }

    let phone = place.formatted_phone_number || "";
    let site = place.website || "";

    const data = {
      title: place.name,
      lat: lat,
      lng: lng,
      address: place.formatted_address,
      icon: place.icon,
      site: site,
      hours: hours,
      phone: phone
    };
    this.props.addPlace(data);
  };

  renderInfoWindow() {
    const { hours } = this.props.selectedItem;

    if (!this.props.selectedItem) {
      return "loading";
    }
    if (!this.props.selectedItem.hours) {
      return;
    }

    return <OpenHours hours={hours} />;
    // return hours.map((day, i) => {
    //   return <li key={i}>{day}</li>;
    // });
  }

  render() {
    const style = {
      width: "100%",
      height: "100%"
    };

    const google = window.google;
    const data = this.props.data;
    const center = this.props.center;

    return (
      <div className="">
        <div className="map-container">
          <Map
            google={google}
            style={style}
            className={"map"}
            zoom={this.props.zoom}
            initialCenter={center}
            onReady={this.setupAutocomplete}
            onClick={this.props.onMapClick}
          >
            {data.map((item, i) => (
              <Marker
                key={i}
                title={item.title}
                name={item.title}
                position={{ lat: item.lat, lng: item.lng }}
                onClick={this.props.markerClick}
                id={i}
                icon={{
                  url: item.icon,
                  scaledSize: new google.maps.Size(32, 32)
                }}
              />
            ))}

            <InfoWindow
              visible={this.props.showInfo}
              position={{
                lat: this.props.selectedItem.lat,
                lng: this.props.selectedItem.lng
              }}
            >
              <div className="infoContent">
                <ul>{this.renderInfoWindow()}</ul>
              </div>
            </InfoWindow>
          </Map>
        </div>
        <div className="searchbox">
          <input
            type="text"
            id="autocomplete"
            ref={this.autocompleteInput}
            placeholder="Enter a location to add to the map"
          />
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
})(MapContainer);
