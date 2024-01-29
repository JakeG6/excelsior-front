import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import marvelLogo from'./marvel-logo.png';
import DCLogo from'./DC-logo.png';
import imageLogo from './image-logo.png';
import valiantLogo from './valiant-logo.jpeg';
import darkHorseLogo from './dark-horse-logo.jpg';
import noImageFound from "./image-default.jpg";
import IDWLogo from './IDW-logo.png';
import ShueishaLogo from './shueisha-logo.png';
import "./ResultsPage.css";

class ResultsPage extends Component {

    render() {

        function cardStylePicker(company) {
            switch(company.toUpperCase()) {
                case "MARVEL":
                    return "card marvel";
                case "DC":
                    return "card dc";
                case "SHUEISHA":
                    return "card shueisha";
                default:
                    return "card indy";
            }
        }

        function logoPicker(company) { 
            switch(company.toUpperCase()) {
                case "MARVEL":
                    return marvelLogo;
                case "DC":
                    return DCLogo;
                case "IMAGE":
                    return imageLogo;
                case "VALIANT":
                    return valiantLogo;
                case "DARK HORSE":
                    return darkHorseLogo;
                case "IDW":
                    return IDWLogo;
                case "SHUEISHA":
                    return ShueishaLogo;
                default:
                    return "";
            } 
        }

        if(this.props.searchedOnce) {
            if (this.props.searchResults.length > 0) {
                return (
                    <div className="resultsPage full-area circuit-background">
                        {   
                            this.props.searchResults.map((char, idx) => {
                                return (
                                    <Grid key={idx} container justify="center">
                                        <Grid item lg={8} xs={12}>
                                            <div className={cardStylePicker(char.company)}>
                                                <Grid container>
                                                    <Grid item md={6} xs={12}>
                                                        <img className="charImage" src={(char.imageURL) ? char.imageURL : noImageFound} />
                                                    </Grid>
                                                    <Grid item md={6} xs={12} justify="center">
                                                        <h1>{char.name.toUpperCase()}</h1>
                                                        <Grid container>
                                                            <Grid item xs={6}>
                                                                <b>Name: </b>
                                                                <p>{char.civName}</p>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <b>Debut: </b>
                                                                <p>{char.firstDebut}</p>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container>
                                                            <Grid item xs={6}>
                                                                <h2>ABILITIES</h2>
                                                                <ul>
                                                                {char.abilities.map((ability, idx) => {
                                                                    return (<li key={idx} className="text-align-left word-wrap">{ability}</li>)
                                                                })}
                                                                </ul>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <h2 className="text-align-left">TEAMS</h2>
                                                                <ul className="team-list">
                                                                {char.teams.map((team,idx) => {
                                                                    return (<li key={idx} className="text-align-left word-wrap">{team}</li>)
                                                                })}
                                                                </ul>
                                                            </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid container>
                                                    <Grid item md={6}>
                                                        <p className="description"><i>{char.desc}</i></p>
                                                    </Grid>
                                                    <Grid item md={6} xs={12} justify="center">
                                                        <img className="company-logo" src={logoPicker(char.company)} alt="Logo"/>            
                                                    </Grid>
                                                     
                                                </Grid>
                                            </Grid>
                                     
                                            </div>                      
                                        </Grid>
                                        
                                    </Grid>                                  
                                )
                            })
                        }    
                    </div>     
                )
            }
            else {
                return (
                    <div className="resultsPage full-area circuit-background">
                    <h1 className="sorry-message">Sorry, but your search didn't find any results.</h1>
                    </div>
                )
            }
        }
        else {
            return (
                <div className="resultsPage full-area circuit-background"></div>
            )
        }
    }
}

export default ResultsPage;