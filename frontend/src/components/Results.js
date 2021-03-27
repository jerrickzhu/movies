import React from 'react';
import { NavLink } from 'react-router-dom';
import "../css/Results.scss";
import axios from "axios";
const _ = require("lodash");

let source;

export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataNYT: this.props.location.state.dataNYT,
            imageContainer: [],
            searchItem: this.props.location.state.searchItem,
            titles: [],
            ids: []
        }

        source = axios.CancelToken.source();
    }

    componentDidMount() {
        let namesList = [];
        for (let index = 0; index < this.state.dataNYT.results.length; index++) {
            namesList.push(this.state.dataNYT.results[index].display_title)
        }
        const url = encodeURIComponent(this.state.searchItem);
        axios
        .post(
            `http://localhost:4000/movieimage/${url}`,
            {names: namesList},
            {cancelToken : source.token}
        ).then(response => {
            this.setState({
                imageContainer: response.data.picList,
                titles: response.data.titleList,
                id: response.data.idList
            })
        });
        console.log(this.state.dataNYT);
    }

    componentWillUnmount() {
        if (source) {
            source.cancel();
        }
    }

    render() {
        return (
            <div>
                <h1>{this.state.searchItem} results found:</h1>
                <div className='results-container'>
                    {this.state.imageContainer.length > 0 &&
                    _.zip(
                        this.state.imageContainer,
                        this.state.titles,
                        this.state.id,
                        this.state.dataNYT.results).map((item) => {
                        return (
                            <div key={`${item[2]}`} className='box'>
                                <NavLink to={{
                                    pathname: `/review/${encodeURIComponent(item[1])}`,
                                    state: {
                                        id: item[2],
                                        dataMovieNYT: item[3]
                                    }
                                }}>
                                    <img className='nyt-pic' 
                                        src={`https://image.tmdb.org/t/p/original${item[0]}`} 
                                        alt='movie-pic'
                                    />
                                </NavLink>
                            </div>
                        ) 
                    })}
                </div>
            </div>
        )
    }
}