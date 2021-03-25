import React from 'react';
import "../css/Results.scss";
import axios from "axios";

export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataNYT: this.props.location.state.dataNYT,
            imageContainer: [],
            searchItem: this.props.location.state.searchItem
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
                imageContainer: response.data
            })
            console.log(this.state.imageContainer);
        });
    }

    render() {
        return (
            <div className='results-container'>
                {this.state.imageContainer.length > 0 && this.state.imageContainer.map((image) => {
                    return (
                        <div className='box'>
                            <img className='nyt-pic' 
                                src={`https://image.tmdb.org/t/p/original${image}`} 
                                alt='movie-pic'
                            />
                        </div>
                    )
                    
                })}
                {console.log(this.state.dataNYT)}
                
            </div>
        )
    }
}