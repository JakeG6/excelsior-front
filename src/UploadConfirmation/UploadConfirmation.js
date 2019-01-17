import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import "./UploadConfirmation.css";


class UploadConfirmation extends Component {

    constructor(props) {

      super(props);
      this.state = {
          redirect: false
      }
      
    }

    componentDidMount() {
        this.id = setTimeout(() => this.setState({ redirect: true }), 3000)
    }
    
    componentWillUnmount() {
        clearTimeout(this.id)
    }
    
    render() {
        if (this.props.isAuthed) {
            return (
                this.state.redirect ? <Redirect to="/" />
                :   
                <div classname="confirmation-page">
                    <div className="confirmation-message">
                        <h1>SUCCESS!</h1>
                        <h2>A NEW CHARACTER HAS BEEN ADDED TO THE DATABASE</h2>
                    </div>
                </div>           
            )
        }
        else {return (<Redirect to="/" />) }
    }
}
export default UploadConfirmation;