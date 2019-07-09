import React, { Component } from "react";

class PlaceList extends Component {
  state = {
    hover: false
  };

  handleHoverOver = e => {
    this.setState({ hover: true });
  };

  handleUnHover = () => {
    this.setState({ hover: false });
  };

  deletePlace = (e, place) => {
    this.props.deletePlace(place);
  };

  render() {
    return (
      <div className="placelist">
        <ul className="side-list">
          {this.props.places.map((place, i) => {
            let className = "";
            if (place.title === this.props.isActive) {
              className += " isActive";
            }

            return (
              <li
                className={className}
                id={i}
                key={i}
                onClick={e => this.props.onClick(place, i)}
              >
                <span className="placelist-item">{place.title}</span>
                <span
                  className="deletePlace"
                  onClick={e => this.deletePlace(e, place)}
                >
                  <i className="fa fa-trash" />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default PlaceList;
