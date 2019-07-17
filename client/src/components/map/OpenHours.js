import React, { Component } from "react";

class OpenHours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readMore: false
    };
  }

  renderHours() {
    let { hours } = this.props;
    let days = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"];
    // if (this.props.expand) {
    return hours.map((day, i) => {
      let time = day.split(": ");

      return (
        <tr className="hours-item" key={i}>
          <th className="open-day">{days[i]}:</th>
          <td className="open-time">{time[1]}</td>
        </tr>
      );
    });
    // }
  }
  toggle = () => {
    this.setState({
      readMore: !this.state.readMore
    });
  };

  render() {
    return (
      <div className="hours">
        {this.props.expand && (
          <div>
            {/* <span>Store Hours</span> */}
            <table className="hours-list">{this.renderHours()}</table>
          </div>
        )}
      </div>
    );
  }
}

export default OpenHours;
