import React from 'react';
import "../css/Landing.scss";
import line from "../images/line.svg";
import axios from "axios";

export default class Landing extends React.Component {
    constructor() {
        super()
        this.search = this.search.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    search(event) {
        axios
         .post(`http://localhost:4000/search/${event.target.value}`)
         .then(response => {
             console.log(response);
         })
       
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.search(e);
        }
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
                    onKeyUp={this.handleKeyPress}
                >
                </input>
                <img src={line} alt="underline"/>
            </div>
        )
    }

}