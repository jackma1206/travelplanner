import React, { Component } from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import "../../styles/tripDetail.scss";

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.autocomplete = null;

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
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
    const data = {
      title: place.name,
      lat: lat,
      lng: lng,
      address: place.formatted_address
    };
    this.props.addPlace(data);
  };

  onMarkerClick = (props, marker, e) => {
    console.log(e);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: !this.state.showingInfoWindow
    });
  };

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
              />
            ))}

            <InfoWindow
              visible={this.props.showInfo}
              position={{
                lat: this.props.selectedItem.lat,
                lng: this.props.selectedItem.lng
              }}
            >
              <div className="infoWindow">
                <h1>{this.props.selectedItem.title}</h1>
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
