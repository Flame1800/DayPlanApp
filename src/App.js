import React, { Component } from 'react';
import { connect } from "react-redux";

import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';
import ContentBar from './components/content/ContentBar.jsx'
import LandingPart from './components/LandingPart.jsx';


const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
}

class App extends Component {
  render() {
    const { user } = this.props;
    const app = (<div className="todo">
      <Sidebar />
      <Navbar />
      <ContentBar />
    </div>);
    return (
      <div className="app">
        {user === null ? <LandingPart /> : app}
      </div>
    );
  }
}

const conntectedApp = connect(mapStateToProps, null)(App);
export default conntectedApp
