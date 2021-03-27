import React from 'react';
import axios from 'axios';

let source;

export default class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.id,
            dataMovie: this.props.location.state.dataMovieNYT
        };
        
        source = axios.CancelToken.source();
    }

    componentDidMount() {
        axios.get('/', {
            cancelToken: source.token
        })
    }

    componentWillUnmount() {
        if (source) {
            source.cancel();
        }
    }


    render() {
        return (
            <div>
                <h1>sup, dude</h1>
                <h1>{this.state.id}</h1>
                {console.log(this.state.dataMovie)}
            </div>
        )
    }
}