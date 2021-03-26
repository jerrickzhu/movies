import React from 'react';
import "../css/Results.scss";
import axios from "axios";
const _ = require("lodash");

export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataNYT: this.props.location.state.dataNYT,
            imageContainer: [],
            searchItem: this.props.location.state.searchItem,
            titles: []
        }
    }

    componentDidMount() {
        let namesList = [];
        for (let index = 0; index < this.state.dataNYT.results.length; index++) {
            namesList.push(this.state.dataNYT.results[index].display_title)
        }
        const url = encodeURIComponent(this.state.searchItem);
        axios
        .post(`http://localhost:4000/movieimage/${url}`, {names: namesList})
        .then(response => {
            this.setState({
                imageContainer: response.data.picList,
                titles: response.data.titleList
            })
        });
        console.log(this.state.dataNYT);
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <h1>{this.state.searchItem} results found:</h1>
                <div className='results-container'>
                    {this.state.imageContainer.length > 0 &&
                    _.zip(
                        this.state.imageContainer,
                        this.state.titles).map((item) => {
                        return (
                            <div className='box'>
                                <a href={`http://localhost:4000/critic/` + encodeURIComponent(item[1])}>
                                    <img className='nyt-pic' 
                                        src={`https://image.tmdb.org/t/p/original${item[0]}`} 
                                        alt='movie-pic'
                                    />
                                </a>
                            </div>
                        ) 
                    })}
                </div>
                {console.log(this.state.imageContainer)}
                {console.log(this.state.titles)}
            </div>
        )
    }
}