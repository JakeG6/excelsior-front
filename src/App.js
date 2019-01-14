import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Search from './Search.js';
import AddChar from './AddChar/AddChar.js';
//import ResultsPage from './ResultsPage.js';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Router>
        
        <div>
        <div className="app">          
          <div className="portfolioBar">
            <div className="arrowContainer">
              <a href="#"><i className="fas fa-arrow-left fa-3x"></i></a>
            </div>
          </div>  
        </div>
         
          <Route exact path="/" component={Search} />
          <Route exact path="/upload" component={AddChar} />
          
        </div>
      </Router>
    );
  }
}

export default App;
