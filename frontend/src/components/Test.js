import React from 'react';
import axios from 'axios';

export default class Test extends React.Component {
    constructor() {
        super()
        this.state = {
            posts: null
        }
    }

    componentDidMount() {
        axios.get('/testing')
        .then(response => {
            this.setState({posts: response.data.post})
        })
        .catch(() => {
            this.setState({posts: "backend not responding :-("})
        })
    }

    render() {
        return (
            <h1>{this.state.posts}</h1>
        );
    }
}