import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dropdown, Divider, Button } from "react-materialize";
import "../styles/header.scss";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return this.renderDropdown();
    }
  }

  renderDropdown() {
    const trigger = (
      <Button className="btn dropdown-btn">
        <img
          className="profile-pic"
          src={this.props.auth.picture}
          alt="profile"
        />
        <span>
          {this.props.auth.name} <i className="fas fa-bars" />
        </span>
      </Button>
    );
    const options = { coverTrigger: false };
    return (
      <Dropdown trigger={trigger} options={options}>
        <a href="/dashboard">Dashboard</a>
        <a href="#">Preferences</a>
        <Divider />
        <a href="/api/logout">Logout</a>
      </Dropdown>
    );
  }

  render() {
    return (
      <nav className="teal lighten-1">
        <div className="nav-wrapper container">
          <Link to={this.props.auth ? "/" : "/"} className="left brand-logo">
            TravelPal
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(Header);
