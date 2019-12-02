import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Popup from 'reactjs-popup';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ResultsPage from "./ResultsPage/ResultsPage.js";
import axios from 'axios';
import "./Search.css";

class Search extends Component {

    constructor(props) {

        super(props);
        this.state = {
        apiURL: '',
        name: '',
        civName: '',
        alignment: '',
        team: '',
        ability: '',
        company: '',
        searchResults: [],
        searchedOnce: false,
        username: '',
        password: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.buildQuery = this.buildQuery.bind(this);
    }
  
    buildQuery() {

        let searchQuery = '/api/chars/search?';
        let queryStrArr = [];

        if (this.state.name) {
        queryStrArr.push(`name=${this.state.name}`);
        }

        if (this.state.alignment) {
        queryStrArr.push(`alignment=${this.state.alignment}`);
        }

        if (this.state.team) {
        queryStrArr.push(`teams=["${this.state.team}"]`);
        }

        if (this.state.ability) {
        queryStrArr.push(`ability=${this.state.ability}`);
        }

        if (this.state.company) {
            queryStrArr.push(`company=${this.state.company}`);
        }

        for (let i = 0; i < queryStrArr.length; i++) {
            searchQuery += queryStrArr[i];
            if  (i < queryStrArr.length -1) {
                searchQuery += '&';
            }
        }
        console.log(searchQuery);
        
        this.setState({apiURL: searchQuery},() => {       
            axios.get(this.state.apiURL).then((response) => {
                this.setState({searchResults: response.data, searchedOnce: true}, () => {
                    console.log(this.state.apiURL);
                    console.log(this.state.searchResults);
                    console.log(this.state.searchedOnce);
                });
            } )
            .catch( (error) => {
                // handle error
                console.log(error);
            })
            .then( () =>  {
                // always executed
                // console.log('good search');
            });
        });
    }
  
  //handle the submit using this.
    handleSubmit(event) {
        console.log(`the response objects: ${this.state.searchResults}`);
        event.preventDefault();
        this.buildQuery();    
    }
  
    render() {
        return (
            <div className="App">
                <div className="searchbar">
                    {
                    this.props.isAuthed ? 
                        <div>
                            <Grid className="link-bar" container spacing={24} justify="flex-end">
                                <Grid item xl={1}>
                                    <Button variant="contained" color="primary"><Link to="/upload">CREATE A CHARACTER</Link></Button>
                                </Grid>
                                <Grid item xl={1}>
                                    <Button variant="contained" color="primary" onClick={this.props.handleLogout}>LOG OUT</Button>
                                </Grid>
                            </Grid>
                        </div>
                        : 
                        <div>
                        <Grid className="link-bar" container spacing={24} justify="flex-end">
                            <Grid item sm={1}>
                                <Popup trigger={<Button variant="contained" color="primary">ADMIN</Button>} modal closeOnDocumentClick >
                                {close => (
                                    <div className="modal">
                                        <a className="close" onClick={() => {close()}}>
                                            &times;
                                        </a>
                                        <form onSubmit={() => {this.props.handleLogin(this.state.username, this.state.password)}}  >
                                            <label>
                                                Username
                                                <input type="text" value={this.state.username} onChange={ event => this.setState({ username: event.target.value })} />
                                            </label>
                                            <label>
                                                Password
                                                <input type="text" value={this.state.password} onChange={ event => this.setState({ password: event.target.value })} />
                                            </label>
                                            <input type="submit" value="LOG IN" />
                                        </form>
                                    </div>
                                )}
                                </Popup>
                            </Grid>
                        </Grid>    
                    </div>    
                    }
                    <div className="logo">
                        <h1>EXCELSIOR</h1>
                        <h2>The Superhero Database</h2>
                    </div>
                    <form className="search-form" onSubmit={this.handleSubmit}>
                        <Grid container spacing={8} alignItems="center" justify="center" direction="row"> 
                            <Grid item lg={2}>
                            <label>Character Name</label>
                                <input  type="text" value={this.state.name} onChange={ event => this.setState({ name: event.target.value })} />
                            </Grid>
                            <Grid item lg={2}>
                                <label>Alignment</label>
                                <select onChange={event => this.setState({ alignment: event.target.value })}>
                                    <option value="">-</option>
                                    <option value="Hero">Hero</option>
                                    <option value="Villain">Villain</option>
                                    <option value="Antihero">Antihero</option>
                                </select>
                            </Grid>
                            <Grid item lg={2}>
                                <label>Team</label>
                                <input type="text" value={this.state.team} onChange={ event => this.setState({ team: event.target.value })} />
                            </Grid>
                            <Grid item lg={2}>
                                <label>Publisher</label>
                                <input type="text" value={this.state.company} onChange={ event => this.setState({ company: event.target.value })} />
                            </Grid>
                            <Grid item xl={2}>
                                <input type="submit" value="SEARCH" />
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <div className="circuit-background">   
                    <ResultsPage searchResults={this.state.searchResults} searchedOnce={this.state.searchedOnce}/>
                </div>
            </div>
        );
    }
}

export default Search;