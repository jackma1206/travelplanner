import React, { Component } from "react";

class OpenHours extends Component {
  state = {
    readMore: false
  };

  expandText = () => {
    console.log("clicked");
    this.setState({
      readMore: true
    });
  };

  renderHours() {
    const { hours } = this.props;
    console.log(this.state.readMore);
    if (this.state.readMore) {
      console.log(this.state.readMore);
      return hours.map((day, i) => {
        return <li key={i}>{day}</li>;
      });
    } else {
      return null;
    }
  }
  render() {
    return (
      <div className="hours">
        <button
          className="hourclick"
          onClick={() => {
            this.setState({
              readMore: !this.state.readMore
            });
          }}
        >
          View Hours
        </button>

        {this.renderHours()}
      </div>
    );
  }
}

export default OpenHours;
