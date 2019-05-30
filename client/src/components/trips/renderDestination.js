import React, { Component } from "react";
import PropTypes from "prop-types";
import Fuse from "fuse.js";
import M from "materialize-css";

class renderDestination extends Component {
  static propTypes = {
    value: PropTypes.string
  };

  static defaultProps = {
    data: []
  };

  constructor(props) {
    super(props);

    const options = {
      shouldSort: true,
      threshold: 0.4,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        {
          name: "iata",
          weight: 0.5
        },
        {
          name: "name",
          weight: 0.2
        },
        {
          name: "city",
          weight: 0.4
        }
      ]
    };
    this.fuse = new Fuse(this.props.data, options);
    M.AutoInit();

    this.state = {
      value: "",
      matchedAirport: []
    };
  }

  componentDidMount() {
    // const value = this.state.value;
    // const matchedAirport = this.fuse.search(value).slice(0, 6);
    // this.setState({
    //   value: value,
    //   matchedAirport,
    //   showDropdown: !!value.trim()
    // });

    if (this.props.input.value) {
      this.setState({
        value: this.props.input.value
      });
    }
  }

  componentWillUpdate() {}
  handleChange = e => {
    const { value } = e.target;

    const matchedAirport = this.fuse.search(value).slice(0, 6);
    this.setState({
      value: value,
      matchedAirport,
      showDropdown: true
    });
    this.props.input.onChange(value);
  };

  handleDropdownClick = airport => {
    const { city, iata, country, name } = airport;
    const value = `${iata} - ${name} - ${city} - ${country}`;
    this.setState({
      value,
      showDropdown: false
    });
    this.props.input.onChange(value);
  };

  renderDropdown = () => {
    const { matchedAirport, showDropdown } = this.state;

    if (!showDropdown) return false;

    return (
      <div className="destinationDropdown">
        <ul className="dropdownList">
          {matchedAirport.map(airport => {
            return (
              <li
                key={airport.iata}
                className="dropdownListItem"
                onClick={() => this.handleDropdownClick(airport)}
              >
                {airport.iata} - {airport.name}
                <div className="airportLocation">
                  {airport.city}, {airport.country}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  render() {
    const { label, meta, input, ...rest } = this.props;
    const selected = this.props.input.value
      ? this.props.input.value
      : this.state.value;

    return (
      <div>
        <label>{label}</label>
        <input
          {...input}
          onChange={this.handleChange}
          value={selected}
          // selected={this.state.value}
          {...rest}
        />
        {meta.error && meta.touched && (
          <span className="form-errors">{meta.error}</span>
        )}
        {this.renderDropdown()}
      </div>
    );
  }
}
export default renderDestination;
