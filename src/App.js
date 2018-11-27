import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home.js';
import ResultsPage from './ResultsPage.js';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Router>
        <div>
         
          <Route exact path="/" component={Home} />
          <Route path="/results" component={ResultsPage} />

          
        </div>
      </Router>
    );
  }
}

export default App;
