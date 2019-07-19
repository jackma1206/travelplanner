import React, { Component } from "react";
import * as actions from "../../actions";
import { connect } from "react-redux";
import TripEditForm from "./TripEditForm";
import TripEditDetails from "./tripEditDetails";
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
      places: [],
      trip: {}
    };
  }

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  async componentDidMount() {
    let { id } = this.props.match.params;
    await this.props.fetchTrip(id);
    this.setState({
      trip: this.props.trip,
      places: this.props.trip.thingsToDo
    });
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
  addPlace = place => {
    let { id } = this.props.match.params;
    this.props.updateToDo(place, id);

    this.setState({
      trip: this.props.trip,
      places: this.state.places.concat(place),
      selectedItem: { lat: place.lat, lng: place.lng }
    });
  };

  deletePlace = place => {
    let { id } = this.props.match.params;
    let toDoId = place._id;
    this.props.deleteToDo(toDoId, id);
    this.setState(prevState => ({
      places: prevState.places.filter(el => el._id !== place._id)
    }));
  };

  renderMap() {
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
            markerClick={this.markerClick}
            onMapClick={this.onMapClick}
          />
          <PlaceList
            places={this.state.places}
            onClick={this.showInfo}
            isActive={this.state.isActive}
            deletePlace={this.deletePlace}
          />
        </div>
      );
    } else {
      return "loading";
    }
  }
  editSubmit = async values => {
    await this.props.updateTrip(values);

    this.setState({
      trip: this.props.trip,
      edit: false
    });
  };

  render() {
    return (
      <div>
        <div className="container">
          {this.state.edit ? (
            <TripEditForm
              initialValues={this.state.trip}
              toggleEdit={this.toggleEdit}
              onSubmit={values => this.editSubmit(values)}
            />
          ) : (
            <TripEditDetails
              data={this.state.trip}
              toggleEdit={this.toggleEdit}
            />
          )}
        </div>
        {this.renderMap()}
      </div>
    );
  }
}

//TODO:

// add marker icon next to list item

function mapStateToProps(state) {
  return { auth: state.auth, trip: state.trips };
}
export default connect(
  mapStateToProps,
  actions
)(TripEdit);
