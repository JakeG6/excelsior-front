import React, { Component } from 'react';
import marvelLogo from'./marvel-logo.png';
import DCLogo from'./DC-logo.png';
import imageLogo from './image-logo.png';
import valiantLogo from './valiant-logo.jpeg';
import darkHorseLogo from './dark-horse-logo.jpg';
import noImageFound from "./image-default.jpg";
import IDWLogo from './IDW-logo.png';
import "./ResultsPage.css";
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class ResultsPage extends Component {

  constructor(props) {
    super(props);
  }
 
  render() {

    function charImagePicker(url) {
        if (url) {
        }
    }

    function cardStylePicker(company) {

        switch(company) {
            case "Marvel":
                return "card marvel";
                break;
            case "DC":
                return "card dc";
                break;
            default:
                return "card indy";
        }

        // if (company === "Marvel") {
        //     return "card marvel";
        // }
        // else if (company === "DC") {
        //     return "card dc";
        // }
        // else {
        //     return "card indy";
        // }
    }

    function logoPicker(company) {

        switch(company) {
            case "Marvel":
                return marvelLogo;
                break;
            case "DC":
                return DCLogo;
                break;
            case "Image":
                return imageLogo;
                break;
            case "Valiant":
                return valiantLogo;
                break;
            case "Dark Horse":
                return darkHorseLogo;
                break;
            case "IDW":
                return IDWLogo;
                break;   
            default:
                return "";
        }


        // if (company === "Marvel") {
        //     return marvelLogo;
        // }
        // else if (company === "DC") {
        //     return DCLogo;
        // }
        // else {
        //     return "";
        // }
    }

    return (
        <div className="resultsPage">
            {
                this.props.searchResults.map((char) => {
                    return (
                        <div className={cardStylePicker(char.company)}>
                            <div className="cardTop">
                                    <img className="charImage" src={(char.imageURL) ? char.imageURL : noImageFound} />
                                <div>
                                    <h1>{char.name.toUpperCase()}</h1>
                                    <div className="cardTop2">
                                        <div>
                                            <b>Name: </b>
                                            <p>{char.civName}</p>
                                        </div>
                                        <div>
                                            <b>Debut: </b>
                                            <p>{char.firstDebut}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="column">
                                            <h2 className="text-align-left">ABILITIES</h2>
                                            <ul className="abilities-list">
                                            {char.abilities.map(ability => {
                                                return (<li className="text-align-left word-wrap">{ability}</li>)
                                            })}
                                            </ul>
                                        </div>
                                        <div className="column ">
                                            <h2 className="text-align-left">TEAMS</h2>
                                            <ul className="team-list">
                                            {char.teams.map(team => {
                                                return (<li className="text-align-left word-wrap">{team}</li>)
                                            })}
                                            </ul>
                                        </div >
                                    </div>
                                    <div className="cardBottom">
                                    <p className="description">{char.desc}</p>
                                    <div className="logoBar">
                                        <img className="company-logo" src={logoPicker(char.company)} alt="Logo"/>         
                                    </div>                   
                                    </div> 
                                </div>
                            </div>
                            
                        </div>
                    )
                })
            }
        </div>
      
    );
  }
}

export default ResultsPage;