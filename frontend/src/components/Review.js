import React from 'react';
import axios from 'axios';
import DOMPurify from "dompurify";
import "../css/Review.scss";

let source;

export default class Review extends React.Component {
    constructor(props) {
        super(props);
        this.getCriticReviews = this.getCriticReviews.bind(this);
        this.state = {
            id: this.props.location.state.id,
            dataMovie: this.props.location.state.dataMovieNYT,
            article: null,
            backdrop: null
        };
        
        source = axios.CancelToken.source();
    }

    getCriticReviews() {
        axios
        .post(
            `http://localhost:4000/critic/${encodeURIComponent(this.state.dataMovie.display_title)}`,
            { 
                articleData: this.state.dataMovie.link.url,
                movieID: this.state.id
            },
            { cancelToken: source.token }
        ).then(response => {
            this.setState({
                article: response.data.articleHTML,
                backdrop: response.data.backdrop
            }); 
        }).catch(err => {
            throw err;
        });

    }

    componentDidMount() {
        this.getCriticReviews();
    }

    componentWillUnmount() {
        if (source) {
            source.cancel();
        }
    }


    render() {
        return (
            <div className="page-container">
                <img className='movie-backdrop' 
                    src={`https://image.tmdb.org/t/p/original${this.state.backdrop}`} 
                    alt='movie-pic'
                />
                <div className="article-container"
                    dangerouslySetInnerHTML=
                        {{__html: DOMPurify.sanitize(this.state.article)}}
                >
                </div>
            </div>
        )
    }
}