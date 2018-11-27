import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ResultsPage extends Component {

  constructor(props) {
    super(props);
    
  

  }

  render() {
    return (
        <div>
            <a>back</a>
            <p>These are the results</p>
        </div>
    );
  }
}

export default ResultsPage;