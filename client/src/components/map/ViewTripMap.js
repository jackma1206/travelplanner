import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";

import OpenHours from "./OpenHours";

class ViewTripMapContainer extends Component {
  constructor(props) {
    super(props);

    this.autocomplete = null;

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      selectedData: [],
      expand: false
    };
  }

  renderHours() {
    const { hours } = this.props.selectedItem;

    if (!this.props.selectedItem) {
      return "loading";
    }
    if (!hours) {
      return;
    } else {
      return <OpenHours hours={hours} expand={this.state.expand} />;
    }
  }
  onInfoWindowOpen() {
    let word = !this.state.expand ? "More Info" : "Show Less";

    const button = (
      <span
        className="more-button"
        onClick={e => {
          this.setState({ expand: !this.state.expand });
        }}
      >
        {word}
      </span>
    );
    ReactDOM.render(
      React.Children.only(button),
      document.getElementById("iwc")
    );
  }

  onInfoWindowClose() {
    this.setState({ expand: false, showingInfoWindow: false });
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
      <>
        <div className="map-container-one">
          <Map
            google={google}
            style={style}
            className={"ViewTripMap"}
            zoom={this.props.zoom}
            initialCenter={center}
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
              onOpen={e => {
                this.onInfoWindowOpen();
              }}
            >
              <div className="infoContent">
                <h3>{this.props.selectedItem.title}</h3>
                {this.state.expand && (
                  <div>
                    <p className="info-address">
                      {this.props.selectedItem.address}
                    </p>
                    <a
                      className="info-site"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={this.props.selectedItem.site}
                    >
                      {this.props.selectedItem.site}
                    </a>
                    <p className="info-phone">
                      {this.props.selectedItem.phone}
                    </p>
                  </div>
                )}
                <ul>{this.renderHours()}</ul>

                <div id="iwc" />
              </div>
            </InfoWindow>
          </Map>
        </div>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
})(ViewTripMapContainer);
