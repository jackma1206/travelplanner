import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class renderDatePicker extends Component {
  static propTypes = {
    input: PropTypes.shape({
      onChange: PropTypes.func,
      value: PropTypes.string
    }).isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string
    }).isRequired,
    inputValueFormat: PropTypes.string
  };

  static defaultProps = {
    inputValueFormat: null
  };

  state = {
    selectedDate: null
  };

  componentWillMount() {
    if (this.props.input.value) {
      this.setState({
        selectedDate: moment(
          this.props.input.value,
          this.props.inputValueFormat
        )
      });
    }
  }

  handleChange = date => {
    this.setState({
      selectedDate: date
    });

    this.props.input.onChange(date);
  };

  render() {
    const {
      meta: { touched, error },
      label,
      input,
      ...rest
    } = this.props;

    const selected = this.props.input.value
      ? moment(this.props.input.value).toDate()
      : null;

    return (
      <div className="">
        <label className="datepicker-label">{label}</label>
        <DatePicker
          selected={selected}
          onChange={this.handleChange}
          {...rest}
        />

        {error && touched && (
          <span className="form-errors" style={{ display: "block" }}>
            {error}
          </span>
        )}
      </div>
    );
  }
}

export default renderDatePicker;
