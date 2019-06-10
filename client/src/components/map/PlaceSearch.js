import React, { Component } from "react";
import * as actions from "../../actions";
import { connect } from "react-redux";
import GoogleMapLoader from "react-google-maps-loader";
import GooglePlacesSuggest from "react-google-places-suggest";

class PlaceSearch extends Component {
  state = {
    search: "",
    value: ""
  };

  handleInputChange = e => {
    this.setState({ search: e.target.value, value: e.target.value });
  };

  handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
    console.log(geocodedPrediction, originalPrediction); // eslint-disable-line
    console.log(geocodedPrediction.geometry.location.lat()); //GETS LAT
    console.log(geocodedPrediction.geometry.location.lng()); //gets lng
    let lat = geocodedPrediction.geometry.location.lat();
    let lng = geocodedPrediction.geometry.location.lng();

    let name = originalPrediction.description.split(",")[0];
    console.log(name);
    const place = {
      lat: lat,
      lng: lng,
      title: name
    };
    this.setState({
      search: "",
      value: originalPrediction.description.split(",")[0]
    });
    this.props.addPlace(place);
  };

  handleNoResult = () => {
    console.log("No results for ", this.state.search);
  };

  handleStatusUpdate = status => {
    console.log(status);
  };

  render() {
    const { search, value } = this.state;
    return (
      <GoogleMapLoader
        params={{
          key: `${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`,
          libraries: "places,geocode"
        }}
        render={googleMaps =>
          googleMaps && (
            <GooglePlacesSuggest
              googleMaps={googleMaps}
              autocompletionRequest={{
                input: search
                // Optional options
                // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
              }}
              // Optional props
              onNoResult={this.handleNoResult}
              onSelectSuggest={this.handleSelectSuggest}
              onStatusUpdate={this.handleStatusUpdate}
              textNoResults="No place found" // null or "" if you want to disable the no results item
              customRender={prediction => (
                <div className="customWrapper">
                  {prediction ? prediction.description : "No place found"}
                </div>
              )}
            >
              <input
                type="text"
                value={value}
                className="placeInput"
                placeholder="Search the location you want to add"
                onChange={this.handleInputChange}
              />
            </GooglePlacesSuggest>
          )
        }
      />
    );
  }
}

export default PlaceSearch;
