import React, { Component } from 'react';
import axios from 'axios';
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
        formSubmitted: false
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

        if (this.state.formSubmitted == true) {
            return (<Redirect to="/upload/success" />)
        }
        else if (this.props.isAuthed) {
            return (
                <div className="addchar">
                    <div className="link-bar">
                        <Link to="/">SEARCH</Link>
                        <p to="#" onClick={this.props.handleLogout}>LOG OUT</p>
                    </div>  
                    <h1 className="addchar-header">Character Upload</h1>
                    <div className="page-center row">
                        <form className="creation-form column" onSubmit={this.handleSubmit}>
                            <label>
                                Name:
                                <input type="text" value={this.state.name} onChange={ event => this.setState({ name: event.target.value })} />
                            </label>
                            <label>
                                Civilian Name:
                                <input type="text" value={this.state.civName} onChange={ event => this.setState({ civName: event.target.value })} />
                            </label>
                            <label>
                                First Debut:
                                <input type="text" value={this.state.firstDebut} onChange={ event => this.setState({ firstDebut: event.target.value })} />
                            </label>
                            <label>
                                Alignment:
                                <select onChange={event => this.setState({ alignment: event.target.value })}>
                                <option value="Hero">Hero</option>
                                <option value="Villain">Villain</option>
                                <option value="Antihero">Antihero</option>
                                </select>
                            </label>
                            <label>
                                Abilities:
                                <textarea type="text" value={this.state.abilities} onChange={ event => this.setState({ abilities: event.target.value.split(',') })} />
                            </label>
                            <label>
                                Teams:
                                <textarea type="text" value={this.state.teams} onChange={ event => this.setState({ teams: event.target.value.split(',') })} />
                            </label>
                            <label>
                                Company:
                                <input type="text" value={this.state.company} onChange={ event => this.setState({ company: event.target.value })} />
                            </label>
                            <label>
                                Biography:
                                <textarea type="text" value={this.state.desc} onChange={ event => this.setState({ desc: event.target.value })} />
                            </label>
                            <label>
                                Character Picture:
                                <input type="text" value={this.state.imageURL} onChange={ event => this.setState({ imageURL: event.target.value })} />
                            </label>
                            <input type="submit" value="SUBMIT" />
                        </form>
                        <div className={cardStylePicker(this.state.company)}>
                            <div className="cardTop">
                                <div className="row">
                                    <img className="charImage" src={(this.state.imageURL) ? this.state.imageURL : noImageFound} />
                                    <div className="column">
                                        <h1>{this.state.name ? this.state.name.toUpperCase() : "CHARACTER NAME"}</h1>
                                        <div className="cardTop2">
                                            <div>
                                                <b>Name: </b>
                                                <p>{this.state.civName}</p>
                                            </div>
                                            <div>
                                                <b>Debut: </b>
                                                <p>{this.state.firstDebut}</p>
                                            </div>
                                        </div>                                   
                                        <div className="row">
                                            <div className="column">
                                                <h2 className="text-align-left">ABILITIES</h2>
                                                <ul className="abilities-list">
                                                    {this.state.abilities.map(ability => {
                                                        return (<li className="text-align-left word-wrap">{ability}</li>)
                                                    })}
                                                </ul>
                                            </div>
                                            <div className="column ">
                                                <h2 className="text-align-left">TEAMS</h2>
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
                                    <p className="description"><i>{this.state.desc}</i></p>
                                    <div className="logo-bar">
                                        <img className="company-logo" src={logoPicker(this.state.company)} alt="Logo"/>        
                                    </div>              
                                </div> 
                            </div>                           
                        </div>
                    </div>      
                </div>              
            );
        } else {return (<Redirect to="/" />) }
  
    }
}
export default AddChar;