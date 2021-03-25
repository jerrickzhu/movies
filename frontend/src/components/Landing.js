import React from 'react';
import "../css/Landing.scss";
import line from "../images/line.svg";
import axios from "axios";
import { Redirect } from 'react-router-dom';

export default class Landing extends React.Component {
    constructor() {
        super()
        this.search = this.search.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            dataNYT: undefined,
            foundData: false,
            url: null,
            searchItem: null
        }
    }

    search(event) {
        const url = encodeURIComponent(event.target.value);
        axios
         .get(`http://localhost:4000/search/${url}`)
         .then(response => {
             if (response.data.num_results && response.data.num_results > 0) {
                this.setState({
                    dataNYT: response.data,
                    foundData: true,
                    url: url,
                    searchItem: event.target.value
               });
             } else {
                 this.setState({
                     dataNYT: undefined,
                     foundData: false,
                     url: null,
                     searchItem: null
                 });
             }
         })
         .catch(err => {
             throw err;
         })
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.search(e);
        }
    }

    componentDidMount() {
        const search = document.querySelector(".search")
        search.addEventListener("keyup", e => {this.handleKeyPress(e)});
    }

    componentWillUnmount() {
        window.removeEventListener("keyup", e => {this.handleKeyPress(e)});
    }

    render() {
        return (
            <div className="landing-text">
                <h1>WHAT IS</h1>
                <h1>THE NEW YORK TIMES</h1>
                <h1>SAYING ABOUT</h1>
                <input className="search"
                    type='search'
                    placeholder=''
                    autoFocus="autofocus"
                />
                <img src={line} alt="underline"/>

                {this.state.foundData ? <Redirect
                    to={{
                        pathname: "/search/" + this.state.url,
                        state: {
                            dataNYT: this.state.dataNYT,
                            searchItem: this.state.searchItem,
                            from: this.props.location 
                        }
                    }}
                    /> : <div></div>
                } 
            </div>
        )
    }
}