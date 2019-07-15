import React, { Component } from "react";

class OpenHours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readMore: false
    };
  }

  renderHours() {
    const { hours } = this.props;
    // console.log(this.state.readMore);
    console.log("here");
    if (this.props.expand) {
      // console.log(this.state.readMore);
      return hours.map((day, i) => {
        return <li key={i}>{day}</li>;
      });
    }
  }
  toggle = () => {
    // console.log("clicked");
    this.setState({
      readMore: !this.state.readMore
    });
  };

  render() {
    return (
      <div className="hours">
        <ul>{this.renderHours()}</ul>
      </div>
    );
  }
}

export default OpenHours;
