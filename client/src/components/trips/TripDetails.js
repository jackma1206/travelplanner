import React, { Component } from "react";
import * as actions from "../../actions";
import { connect } from "react-redux";
import TripEditForm from "./TripEditForm";
import TripDeets from "./tripDeets";
import MapContainer from "../map/Map";
import "../../styles/tripDetail.scss";
import PlaceList from "../map/placeList";

const data = [
  {
    name: "Sydney",
    title: "Sydney",
    lat: -33.847927,
    lng: 150.6517938,
    id: 1
  },
  {
    name: "Melbourne",
    title: "Melbourne",
    lat: -37.9722342,
    lng: 144.7729561,
    id: 2
  },
  {
    name: "Perth",
    title: "Perth",
    lat: -31.9546904,
    lng: 115.8350292,
    id: 3
  }
];

class TripEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      selectedItem: { lat: 0, lng: 0 },
      showInfo: false,
      isActive: ""
    };
  }

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchTrip(id);
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

    console.log(selectedItem);
  };

  renderMap() {
    if (this.props.trip.location !== undefined) {
      const { long, lat } = this.props.trip.location;
      return (
        <div className="map-wrap">
          <MapContainer
            center={{
              lat: lat,
              lng: long
            }}
            zoom={12}
            data={data}
            selectedItem={this.state.selectedItem}
            showInfo={this.state.showInfo}
          />
          <div className="side-list">
            <PlaceList
              places={data}
              onClick={this.showInfo}
              isActive={this.state.isActive}
            />
          </div>
        </div>
      );
    } else {
      return "loading";
    }
  }
  //below that is itinerary show map +
  render() {
    console.log(this.props);

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
//SHOW MAP AT DESTINATION WHEN COMING TO THIS PAGE, LOAD MARKERS
//set up search for places
//save places to db after every add
//FILTERS?
//

function mapStateToProps(state) {
  return { auth: state.auth, trip: state.trips };
}
export default connect(
  mapStateToProps,
  actions
)(TripEdit);
