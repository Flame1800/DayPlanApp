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
          <div className="logo">PomodoroDay</div>
          <div className="navbar__data">
            28 Июня, вс <br />
            <span className="data__time">15.49</span>
          </div>
        </div>

        <div className="navbar__rigth">
          <div className="navbar__money">
          {user.ballance}
            <div
              alt="moneys"
              className="pomodoro-icon-main"
            ></div>
           
          </div>
          <div className="navbar__person">
            <div className="navbar__person__name">
            {user.name} <br/> 21 день
            </div>

          </div>
          <div className="logout-button" onClick={this.handleLogout}>Выйти</div>
        </div>
      </div>
    );
  }
}

const ConnectedNavbar = connect(mapStateToProps, createActions)(Navbar);
export default ConnectedNavbar;
