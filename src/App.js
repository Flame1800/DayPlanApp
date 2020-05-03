import React, { Component } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';
import ContentBar from './components/content/ContentBar.jsx'

class App extends Component {
  render() {
    return (
      <div className="todo">
        <Sidebar />
        <Navbar />
        <ContentBar />
      </div>
    );
  }
}

export default App;
