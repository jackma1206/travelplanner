import React, { Component } from "react";
import PropTypes from "prop-types";
import Fuse from "fuse.js";
import M from 'materialize-css';


class renderDestination extends Component {
  static propTypes = {
    value: PropTypes.string
  };

  static defaultProps = {
    data: []
  };

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      matchedAirport: []
    };
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
          weight: 0.3
        },
        {
          name: "city",
          weight: 0.2
        }
      ]
    };
    this.fuse = new Fuse(this.props.data, options);
    M.AutoInit();
  }

  componentDidMount() {
    const { value } = this.state;
    const matchedAirport = this.fuse.search(value).slice(0, 6);

    this.setState({
      value: value.trim(),
      matchedAirport,
      showDropdown: !!value.trim()
    });
  }

  handleChange = e => {
    const { value } = e.target;

    const matchedAirport = this.fuse.search(value).slice(0, 6);
    this.setState({
      value: value.trim(),
      matchedAirport,
      showDropdown: true
    });
  };

  handleDropdownClick = airport => {
    console.log(airport);
    const { city, country, iata, name } = airport;
    const value = `${city} - ${iata}`;
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
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  render() {
    const { label, meta, input,...rest } = this.props;
    console.log(this.props);
    return (
      <div className="input-field">
        <label>{label}</label>
        <input
          {...input}
          onChange={this.handleChange}
          value={this.state.value}
          selected={this.state.value}
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
