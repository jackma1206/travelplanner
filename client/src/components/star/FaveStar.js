import React, { Component } from "react";
import * as actions from "../../actions";
import { connect } from "react-redux";

class FaveStar extends Component {
  state = {
    isFave: false
  };

  async componentDidMount() {
    await this.props.fetchUser();
    if (this.props.auth) {
      for (let id of this.props.auth.trips) {
        if (this.props.tId === id) {
          this.setState({
            isFave: true
          });
        }
      }
    }
  }
  onStarClick = async () => {
    const uId = this.props.auth._id;
    const tId = this.props.tId;
    if (this.state.isFave) {
      await this.props.deleteFave(uId, tId);
    } else {
      await this.props.addFave(uId, tId);
    }
    this.setState({
      isFave: !this.state.isFave
    });
  };

  renderStar() {
    if (this.state.isFave) {
      return (
        <li>
          <span className="star-icon fave">
            <i className="fa fa-star" onClick={this.onStarClick} />
          </span>
        </li>
      );
    }
    return (
      <li>
        <span className="star-icon">
          <i className="fa fa-star" onClick={this.onStarClick} />
        </span>
      </li>
    );
  }
  render() {
    return this.renderStar();
  }
}

function mapStateToProps(state) {
  return {
    trips: state.trips,
    auth: state.auth
  };
}
export default connect(
  mapStateToProps,
  actions
)(FaveStar);
