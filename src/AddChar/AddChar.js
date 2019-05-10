import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import {Grid} from '@material-ui/core';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import marvelLogo from'./marvel-logo.png';
import DCLogo from'./DC-logo.png';
import imageLogo from './image-logo.png';
import valiantLogo from './valiant-logo.jpeg';
import darkHorseLogo from './dark-horse-logo.jpg';
import noImageFound from "./image-default.jpg";
import IDWLogo from './IDW-logo.png';
import './AddChar.css';


class AddChar extends Component {

    constructor(props) {
      super(props);
      this.state = {
        apiURL: '',
        name: '',
        civName: '',
        firstDebut: '',
        alignment: 'Hero',
        teams: [],
        abilities: [],
        company: '',
        imageURL:'',
        desc: '',
        formSubmitted: false,
        readyToSubmit: false,
        attemptMessage: ''
      }
  
      this.handleSubmit = this.handleSubmit.bind(this);
      this.postCharacter = this.postCharacter.bind(this);
  
    }
    
    postCharacter() {
        axios.post('https://excelsior-api.herokuapp.com/chars/create',{
            name: this.state.name,
            civName: this.state.civName,
            firstDebut: this.state.firstDebut,
            alignment: this.state.alignment,
            teams: this.state.teams,
            abilities: this.state.abilities,
            company: this.state.company,
            imageURL: this.state.imageURL,
            desc: this.state.desc

        }).then((response) => {
            // handle success
            //console.log(response);
        })
        .catch( (error) => {
            // handle error
            console.log(error);
        });            
    }
    
    //handle the submit using this.
    handleSubmit(event) {
      event.preventDefault();
      this.postCharacter();
      this.setState({formSubmitted: true});
    }
   
    render() {

        function cardStylePicker(company) {

            switch(company.toUpperCase()) {
                case "MARVEL":
                    return "custom-card marvel";
                    break;
                case "DC":
                    return "custom-card dc";
                    break;
                default:
                    return "custom-card indy";
            }
        }
    
        function logoPicker(company) {
    
            switch(company.toUpperCase()) {
                case "MARVEL":
                    return marvelLogo;
                    break;
                case "DC":
                    return DCLogo;
                    break;
                case "IMAGE":
                    return imageLogo;
                    break;
                case "VALIANT":
                    return valiantLogo;
                    break;
                case "DARK HORSE":
                    return darkHorseLogo;
                    break;
                case "IDW":
                    return IDWLogo;
                    break;   
                default:
                    return "";
            }
        }

        let loggedIn = localStorage.getItem("authorized");
        //console.log(`the loggedIn is ${loggedIn}`);

        if (this.state.formSubmitted == true) {
            return (<Redirect to="/upload/success" />)
        }
        else if (loggedIn === 'true') {
            return (
                <div className="addchar" style={{padding: 12}}>
                    <Grid container spacing={24} justify="flex-end">
                        <Grid item lg={1}>
                            <Button variant="contained" color="primary"><Link to="/">SEARCH</Link></Button>
                        </Grid>
                        <Grid item lg={1}>
                            <Button variant="contained" color="primary" onClick={this.props.handleLogout}><Link to="/">LOG OUT</Link></Button>
                        </Grid>
                    </Grid>
                    <h1 className="addchar-header">Character Upload</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-container ">
                            <div className="form-item">
                                <p>Name</p>
                                <input type="text" value={this.state.name} onChange={ event => this.setState({ name: event.target.value })} />   
                            </div>
                            <div className="form-item">
                                <p>Civilian Name</p>
                                <input type="text" value={this.state.civName} onChange={ event => this.setState({ civName: event.target.value })} />
                            </div>
                            
                            <div className="form-item">
                                <p>First Debut</p>
                                <input type="text" value={this.state.firstDebut} onChange={ event => this.setState({ firstDebut: event.target.value })} />
                            </div>
                            
                            <div className="form-item">
                                <p>Alignment</p>
                                <select onChange={event => this.setState({ alignment: event.target.value })}>
                                    <option value="Hero">Hero</option>
                                    <option value="Villain">Villain</option>
                                    <option value="Antihero">Antihero</option>
                                </select>
                            </div>
                            
                            <div className="form-item">
                                <p>Abilities</p>
                                <textarea type="text" value={this.state.abilities} onChange={ event => this.setState({ abilities: event.target.value.split(',') })} />
                            </div>
                            
                            <div className="form-item">
                                <p>Teams</p>
                                <textarea type="text" value={this.state.teams} onChange={ event => this.setState({ teams: event.target.value.split(',') })} />
                            </div>
                            
                            <div className="form-item">
                                <p>Biography</p>
                                <textarea type="text" value={this.state.desc} onChange={ event => this.setState({ desc: event.target.value })} />
                            </div>
                            
                            <div className="form-item">
                                <p>Company</p>
                                <input type="text" value={this.state.company} onChange={ event => this.setState({ company: event.target.value })} />
                            </div>
                            
                            <div className="form-item">
                                <p>Character Picture</p>
                                <input type="text" value={this.state.imageURL} onChange={ event => this.setState({ imageURL: event.target.value })} />
                            </div>
                            
                            <div className="form-item submit-container">
                                <input type="submit" value="SUBMIT" className="add-char-submit"/>
                            </div>

                        </div>
                    </form>   
                    <div className={cardStylePicker(this.state.company)}>
                        <div className="cardTop">
                            <div className="row">
                                <div className="card-container image-container">
                                    <img className="charImage" src={(this.state.imageURL) ? this.state.imageURL : noImageFound} />
                                </div>
                                <div className="column card-container">
                                    <h1>{this.state.name ? this.state.name.toUpperCase() : "CHARACTER NAME"}</h1>
                                    <div className="cardTop2">
                                        <div className="text-center card-container">
                                            <b>Name: </b>
                                            <p>{this.state.civName}</p>
                                        </div>
                                        <div className="text-center card-container">
                                            <b>Debut: </b>
                                            <p>{this.state.firstDebut}</p>
                                        </div>
                                    </div>                                   
                                    <div className="row">
                                        <div className="column card-container abilities">
                                            <h2 className="text-center">ABILITIES</h2>
                                            <ul className="abilities-list">
                                                {this.state.abilities.map(ability => {
                                                    return (<li className="text-align-left word-wrap">{ability}</li>)
                                                })}
                                            </ul>
                                        </div>
                                        <div className="column card-container teams">
                                            <h2 className="text-center">TEAMS</h2>
                                            <ul className="team-list">
                                            {this.state.teams.map(team => {
                                                return (<li className="text-align-left word-wrap">{team}</li>)
                                            })}
                                            </ul>
                                        </div >
                                    </div>
                                </div>
                            </div>                                 
                            <div className="cardBottom row">
                                <div className="card-container text-center">
                                    <p className="description"><i>{this.state.desc ? this.state.desc : "This is where the character's description or biograpy will go. Put all pertinent information here."}</i></p>
                                </div>
                                <div className="logo-bar card-container">
                                    {this.state.company ?
                                    <img className="company-logo" src={logoPicker(this.state.company)} alt="Logo"/> : <div></div>}       
                                </div>              
                            </div> 
                        </div>                           
                    </div>                                 
                </div>              
            );
        } else {
            return (<Redirect to="/" />) }  
    }
}
export default AddChar;