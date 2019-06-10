import React, { Component } from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import "../../styles/tripDetail.scss";

//TODO
//setvalue of input or send it up and save to db rerender the new ones
//handle the click..
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
    this.autocomplete = new google.maps.places.Autocomplete(input, {
      types: ["establishment"]
    });
    this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
  };
  handlePlaceChanged = () => {
    const place = this.autocomplete.getPlace();
    //this.props.onPlaceChanged(place);
    console.log("here");
    console.log(place);
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
          >
            {data.map((item, i) => (
              <Marker
                key={i}
                title={item.title}
                name={item.title}
                position={{ lat: item.lat, lng: item.lng }}
              />
            ))}

            <InfoWindow
              visible={this.props.showInfo}
              position={{
                lat: this.props.selectedItem.lat,
                lng: this.props.selectedItem.lng
              }}
            >
              <div>
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
            placeholder="Enter a location"
          />
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
})(MapContainer);
