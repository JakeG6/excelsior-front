import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Search from './Search.js';
import AddChar from './AddChar/AddChar.js';
import UploadConfirmation from './UploadConfirmation/UploadConfirmation.js';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authorized: false,
      attemptMessage: ''
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.rememberAuthorization = this.rememberAuthorization.bind(this);
  }

  rememberAuthorization() {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty("authorized")) {
        // get the key's value from localStorage
        let value = localStorage.getItem("authorized");

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ authorized: value });
        } catch (e) {
          // handle empty string
          this.setState({ authorized: value });
        }
      }
    
  }

  handleLogin(username, password) {
    if (username === "admin" && password === "dapassword") {
      //console.log(this.state.authorized)
      this.setState({ authorized: true, attemptMessage:'' }, () => {
        //console.log(this.state.authorized)
        localStorage.setItem("authorized", JSON.stringify(this.state.authorized))
        //close()

      })

    }
    else {
      this.setState({attemptMessage: 'ACCESS DENIED: User not recognized'})
      //console.log("access denied")
    }
     
  }

  handleLogout() {
    this.setState({authorized: false}, () => {
      //console.log(this.state.authorized)
      localStorage.setItem("authorized", JSON.stringify(this.state.authorized))
      //console.log(this.state.authorized)
      //this.props.history.push("/");

    })
  }

  componentDidMount() {
    this.rememberAuthorization();
  }

  render() {

    return (
      <Router>
        <div>
          <div className="app">          
            <div className="portfolioBar">
              <div className="arrowContainer">
                <a href="https://jake-guss.herokuapp.com/portfolio"><i className="fas fa-arrow-left fa-3x"></i></a>
              </div>
            </div>  
          </div>
          <Route 
            exact path='/' render={(props) => 
            <Search isAuthed={this.state.authorized} attemptMessage={this.state.attemptMessage} handleLogout={this.handleLogout} handleLogin={this.handleLogin} {...props} />
          }
          />
          <Route 
            exact path='/upload' render={(props) => 
            <AddChar isAuthed={this.state.authorized} handleLogout={this.handleLogout} handleLogin={this.handleLogin} {...props} />
          }
          />
          <Route 
            exact path='/upload/success' render={(props) => 
            <UploadConfirmation isAuthed={this.state.authorized} handleLogout={this.handleLogout} handleLogin={this.handleLogin} {...props} />
            }
          />
        </div>
      </Router>
    );
  }
}

export default App;