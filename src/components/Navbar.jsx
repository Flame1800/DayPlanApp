import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  const { ballance } = state;
  return { ballance };
};

class Navbar extends Component {
  render() {
    const { ballance } = this.props;

    return (
      <div className="navbar">
        <div className="navbar__left">
          <div className="logo">DayPlan</div>
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
              alt="0"
              className="money-icon"
            />{" "}
            {ballance}
          </div>
          <div className="navbar__person">
            <div className="navbar__person__name">
              Василий <br /> Пупкин
            </div>
            <img
              className="person__photo"
              src="https://img4.goodfon.ru/original/2048x1367/2/4f/lolita-portret-prelest-gubki-lokony.jpg"
              alt="person"
            ></img>
          </div>
        </div>
      </div>
    );
  }
}

const ConnectedNavbar = connect(mapStateToProps, null)(Navbar);
export default ConnectedNavbar;
