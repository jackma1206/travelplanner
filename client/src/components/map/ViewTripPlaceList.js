import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

class ViewTripPlaceList extends Component {
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
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 3
    };

    return (
      <div className="slider-wrap">
        <Slider {...settings}>
          {this.props.places.map((place, i) => {
            let className = "slider-item";

            if (place.title === this.props.isActive) {
              className += " isActive-one";
            }
            let pic = place.picture || place.icon;
            return (
              <>
                <div
                  className={className}
                  id={i}
                  key={`${place.title}${i}`}
                  onClick={e => this.props.onClick(place, i)}
                >
                  <div className="row">
                    <div className="col s6">
                      <img src={pic} className="place-pic" />
                    </div>
                    <div className="col s6">
                      <h2 className="slider-title">{place.title}</h2>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </Slider>
      </div>
    );
  }
}
export default ViewTripPlaceList;
