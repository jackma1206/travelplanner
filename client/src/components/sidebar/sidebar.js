import React, { Component } from "react";
import TripsNew from "../trips/TripsNew";
import Sidetab from "./sidetab";
import FIELDS from "./sidebarFields";

class sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };
  }

  renderFields(fields) {
    let list = fields.map((field, i) => {
      return (
        <Sidetab
          name={field.name}
          href={field.href}
          key={i}
          id={i}
          icon={field.icon}
          onClick={() => {
            this.handleActive(i);
          }}
          isActive={this.state.activeTab}
        />
      );
    });

    return list;
  }

  handleActive(i) {
    this.setState({
      activeTab: i
    });
    this.props.onChange(i);
  }

  render() {
    return (
      <div className="sidebar">
        <ul>
          {this.renderFields(FIELDS)}
          <TripsNew />
          <li className="waves-effect logout-dash">
            <span className="dash-icon">
              <a href="/api/logout">
                <i className="fas fa-sign-out-alt" /> Logout
              </a>
            </span>
          </li>
        </ul>
      </div>
    );
  }
}

export default sidebar;
