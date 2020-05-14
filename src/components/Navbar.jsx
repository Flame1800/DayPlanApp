import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index.js";

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const createActions = {
  logoutUser: actions.logoutUser,
}

class Navbar extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  }

  render() {
    const { user } = this.props;

    return (
      <div className="navbar">
        <div className="navbar__left">
          <div className="logo">DayPlaner</div>
          <div className="navbar__data">
            27 Апреля, понедельник <br />
            <span className="data__time">18.38</span>
          </div>
          <div className="navbar__mode-button">классический режим</div>
        </div>

        <div className="navbar__rigth">
          <div className="navbar__money">
            <img
              src="https://image.flaticon.com/icons/svg/138/138233.svg"
              alt="moneys"
              className="money-icon"
            />
           {user.ballance}
          </div>
          <div className="navbar__person">
            <div className="navbar__person__name">
              Вы вошли как  <br/> {user.name}
            </div>
            {/* <img
              className="person__photo"
              src=""
              alt="person"
            ></img> */}
          </div>
          <div className="logout-button" onClick={this.handleLogout}>Выйти</div>
        </div>
      </div>
    );
  }
}

const ConnectedNavbar = connect(mapStateToProps, createActions)(Navbar);
export default ConnectedNavbar;
