import React, { Component } from 'react';
import { connect } from "react-redux";

import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';
import ContentBar from './components/content/ContentBar.jsx';
import LandingPart from './components/LandingPart.jsx';
import ModalCurrTask from './components/ModalCurrTask.jsx';


const mapStateToProps = (state) => {
  const { user, setUserState, currentTask } = state;
  return { user, setUserState, currentTask };
}

class App extends Component {


  render() {
    const { user, setUserState, currentTask } = this.props;


    const app = (<div className="todo">
      <Sidebar />
      <Navbar />
      <ContentBar />
      <ModalCurrTask currentTask={currentTask}/>
    </div>);

    if (setUserState === 'requested') {
      return (<div className="text-center spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>);
    }
    return (
      <div className="app">
        {user === null ? <LandingPart /> : app}
      </div>
    );
  }
}

const conntectedApp = connect(mapStateToProps, null)(App);
export default conntectedApp;
