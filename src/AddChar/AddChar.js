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
        readyToSubmit: false
      }
  
      this.handleSubmit = this.handleSubmit.bind(this);
      this.postCharacter = this.postCharacter.bind(this);
  
    }
    
        postCharacter() {
            axios.post('http://localhost:8080/chars/create',{
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
                console.log(response);
                console.log('good post');
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

    // componentDidUpdate() {
            
    //     let charProperties = [
    //         this.state.name,
    //         this.state.civName,
    //         this.state.firstDebut,
    //         this.state.alignment,
    //         this.state.teams,
    //         this.state.abilities,
    //         this.state.company,
    //         this.state.imageURL,
    //         this.state.desc
    //     ];
        
    //     let isFilledOut = (charProperty) => {
    //         return charProperty;
    //     }

    //     if (charProperties.every(isFilledOut)) {
    //         this.setState({readyToSubmit: true})
    //     }
    // }
    
    render() {

        

        

        function cardStylePicker(company) {

            switch(company.toUpperCase()) {
                case "MARVEL":
                    return "card marvel";
                    break;
                case "DC":
                    return "card dc";
                    break;
                default:
                    return "card indy";
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

        if (this.state.formSubmitted == true) {
            return (<Redirect to="/upload/success" />)
        }
        else if (loggedIn) {
            return (
                <div className="addchar">
                    <Grid container spacing={24} justify="flex-end">
                        <Grid item lg={1}>
                            <Button variant="contained" color="primary"><Link to="/">SEARCH</Link></Button>
                        </Grid>
                        <Grid item lg={1}>
                            <Button variant="contained" color="primary" onClick={this.props.handleLogout}>LOG OUT</Button>
                        </Grid>
                    </Grid>
                    <h1 className="addchar-header">Character Upload</h1>
                    <form onSubmit={this.handleSubmit}>
                        <Grid container spacing={8} >
                            <Grid item xs={4}>
                                <label>Name</label>
                                <input type="text" value={this.state.name} onChange={ event => this.setState({ name: event.target.value })} />
                                
                            </Grid>
                            <Grid item xs={4}>
                                <label>Civilian Name</label>
                                <input type="text" value={this.state.civName} onChange={ event => this.setState({ civName: event.target.value })} />
                            </Grid>
                            <Grid item xs={4}>
                                <label>First Debut</label>
                                <input type="text" value={this.state.firstDebut} onChange={ event => this.setState({ firstDebut: event.target.value })} />
                            </Grid>
                            <Grid item xs={4}>  
                                <label>Alignment</label>
                                <select onChange={event => this.setState({ alignment: event.target.value })}>
                                    <option value="Hero">Hero</option>
                                    <option value="Villain">Villain</option>
                                    <option value="Antihero">Antihero</option>
                                </select>
                            </Grid>
                            <Grid item xs={4}>
                                <label>Abilities</label>
                                <textarea type="text" value={this.state.abilities} onChange={ event => this.setState({ abilities: event.target.value.split(',') })} />
                            </Grid>
                            <Grid item xs={4}>
                                <label>Teams</label>
                                <textarea type="text" value={this.state.teams} onChange={ event => this.setState({ teams: event.target.value.split(',') })} />
                            </Grid>
                            <Grid item xs={4}>
                                <label>Company</label>
                                <input type="text" value={this.state.company} onChange={ event => this.setState({ company: event.target.value })} />
                            </Grid>
                            <Grid item xs={4} >
                                <label>Biography</label>
                                <textarea type="text" value={this.state.desc} onChange={ event => this.setState({ desc: event.target.value })} />
                            </Grid>
                            <Grid item xs={4} >
                                <label>Character Picture</label>
                                <input type="text" value={this.state.imageURL} onChange={ event => this.setState({ imageURL: event.target.value })} />
                            </Grid>
                            <Grid item xs={12} >
                                <input type="submit" value="SUBMIT" />
                            </Grid>
                        </Grid>
                    </form> 
                        
                        {/* <Grid container spacing={16} justify="center">
                            <div className={cardStylePicker(this.state.company)}>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <img className="charImage" src={(this.state.imageURL) ? this.state.imageURL : noImageFound} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <h1>{this.state.name ? this.state.name.toUpperCase() : "CHARACTER NAME"}</h1>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <b>Name: </b>
                                                    <p>{this.state.civName}</p>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <b>Debut: </b>
                                                    <p>{this.state.firstDebut}</p>
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <h2 className="text-align-left">ABILITIES</h2>
                                                    <ul className="abilities-list">
                                                    {this.state.abilities.map(ability => {
                                                        return (<li className="text-align-left word-wrap">{ability}</li>)
                                                    })}
                                                    </ul>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <h2 className="text-align-left">TEAMS</h2>
                                                    <ul className="team-list">
                                                    {this.state.teams.map(team => {
                                                        return (<li className="text-align-left word-wrap">{team}</li>)
                                                    })}
                                                    </ul>
                                                </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <p className="description"><i>{this.state.desc}</i></p>
                                        </Grid>
                                        <Grid item xs={6} alignItems="center" justify="center">
                                            { this.state.company ? <img className="company-logo" src={logoPicker(this.state.company)} alt="Logo"/> : <div></div> }            
                                        </Grid>      
                                    </Grid>
                                </Grid>
                            </div>                      
                        </Grid> */}                   
                </div>              
            );
        } else {
            return (<Redirect to="/" />) }
  
    }
}
export default AddChar;