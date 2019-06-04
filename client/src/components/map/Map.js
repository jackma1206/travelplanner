import React, { Component } from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import "../../styles/tripDetail.scss";

class MapContainer extends Component {
  render() {
    const style = {
      width: "100%",
      height: "100%"
    };

    const google = window.google;
    const data = this.props.data;
    const center = this.props.center;
    return (
      <div className="map-container">
        <Map
          google={google}
          style={style}
          className={"map"}
          zoom={this.props.zoom}
          initialCenter={center}
        >
          {data.map(item => (
            <Marker
              key={item.id}
              title={item.name}
              name={item.name}
              position={{ lat: item.lat, lng: item.lng }}
            />
          ))}
          <InfoWindow
            visible={this.props.showInfo}
            position={{
              lat: this.props.selectedItem.lat + 0.0001,
              lng: this.props.selectedItem.lng + 0.0001
            }}
          >
            <div>
              <h1>{this.props.selectedItem.title}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
})(MapContainer);
