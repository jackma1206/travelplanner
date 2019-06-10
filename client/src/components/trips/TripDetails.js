import React, { Component } from "react";
import * as actions from "../../actions";
import { connect } from "react-redux";
import TripEditForm from "./TripEditForm";
import TripDeets from "./tripDeets";
import MapContainer from "../map/Map";
import "../../styles/tripDetail.scss";
import PlaceList from "../map/placeList";

class TripEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      selectedItem: { lat: 0, lng: 0 },
      showInfo: false,
      isActive: "",
      places: []
    };
  }

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    await this.props.fetchTrip(id);
    this.setState({
      places: this.props.trip.thingsToDo
    });
  }

  showInfo = (e, selectedItem, id) => {
    if (selectedItem !== this.state.selectedItem) {
      this.setState({
        selectedItem: selectedItem,
        showInfo: true,
        isActive: id
      });
    } else {
      this.setState({
        selectedItem: selectedItem,
        showInfo: !this.state.showInfo,
        isActive: ""
      });
    }
  };

  addPlace = place => {
    console.log("from place");
    console.log(place);
    const { id } = this.props.match.params;
    this.props.updateToDo(place, id);
    this.setState({
      places: this.state.places.concat(place),
      selectedItem: { lat: place.lat, lng: place.lng }
    });
  };

  renderMap() {
    console.log(this.props.trip.thingsToDo);
    if (
      this.props.trip.location !== undefined &&
      this.props.trip.thingsToDo !== undefined
    ) {
      let long, lat;
      if (this.state.places.length) {
        long = this.state.places[0].lng;
        lat = this.state.places[0].lat;
      } else {
        long = this.props.trip.location.long;
        lat = this.props.trip.location.lat;
      }
      return (
        <div className="map-wrap">
          <MapContainer
            center={{
              lat: lat,
              lng: long
            }}
            zoom={10}
            data={this.state.places}
            selectedItem={this.state.selectedItem}
            showInfo={this.state.showInfo}
            addPlace={this.addPlace}
          />
          <PlaceList places={this.state.places} onClick={this.showInfo} />
        </div>
      );
    } else {
      return "loading";
    }
  }

  render() {
    // console.log(this.state);

    return (
      <div>
        <div className="container">
          {this.state.edit ? (
            <TripEditForm
              initialValues={this.props.trip}
              toggleEdit={this.toggleEdit}
            />
          ) : (
            <TripDeets data={this.props.trip} toggleEdit={this.toggleEdit} />
          )}
        </div>
        {this.renderMap()}
      </div>
    );
  }
}

//TODO:

// add marker icon next to list item
// marker icons on map
// post info from edit button form
//

function mapStateToProps(state) {
  return { auth: state.auth, trip: state.trips };
}
export default connect(
  mapStateToProps,
  actions
)(TripEdit);
