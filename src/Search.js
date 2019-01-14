import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ResultsPage from "./ResultsPage/ResultsPage.js";
//import Results from 'Results';
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
      searchedOnce: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.buildQuery = this.buildQuery.bind(this);

  }
  
    buildQuery() {

        let searchQuery = 'http://localhost:8080/chars/search?';
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

        console.log(`the search query is ${searchQuery}!`);
        console.log(this.state.searchedOnce)
        
        this.setState({apiURL: searchQuery},() => {
        
            axios.get(this.state.apiURL).then((response) => {
                // handle success
                console.log(response);
                this.setState({searchResults: response.data, searchedOnce: true}, () => {
                    // console.log(this.state.searchResults);

                        console.log(this.state.searchedOnce)
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
                    <div className="link-bar">
                        <Link to="/upload">CREATE A CHARACTER</Link>
                        <Link to="#">LOG OUT</Link>
                    </div>
                    <div className="logo">
                        <h1>EXCELSIOR</h1>
                        <h2>The Superhero Database</h2>
                    </div>
                    <form className="search-form" onSubmit={this.handleSubmit}>
                        <label>
                            Name
                            <input  type="text" value={this.state.name} onChange={ event => this.setState({ name: event.target.value })} />
                        </label>
                        <label>
                            Alignment
                            <select onChange={event => this.setState({ alignment: event.target.value })}>
                                <option value="">-</option>
                                <option value="Hero">Hero</option>
                                <option value="Villain">Villain</option>
                                <option value="Antihero">Antihero</option>
                            </select>
                        </label>
                        <label>
                            Team
                            <input type="text" value={this.state.team} onChange={ event => this.setState({ team: event.target.value })} />
                        </label>
                        <label>
                            Company
                            <input type="text" value={this.state.company} onChange={ event => this.setState({ company: event.target.value })} />
                        </label>
                        <input type="submit" value="SUBMIT" />
                    </form>
                </div>   
                <ResultsPage searchResults={this.state.searchResults} searchedOnce={this.state.searchedOnce}/>
            </div>
        );
    }
}

export default Search;