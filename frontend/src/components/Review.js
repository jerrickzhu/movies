import React from 'react';
import axios from 'axios';
import "../css/Review.scss";
import Parser from "html-react-parser";

let source;

export default class Review extends React.Component {
    constructor(props) {
        super(props);
        this.getCriticReviews = this.getCriticReviews.bind(this);
        this.state = {
            id: this.props.location.state.id,
            dataMovie: this.props.location.state.dataMovieNYT,
            article: null,
            backdrop: null,
            requestCompleted: false
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
                backdrop: response.data.backdrop,
                requestCompleted: true
            });
            console.log(this.state.article)
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
        if (this.state.requestCompleted) {
            return (
                <div className="page-container">
                
                {console.log(this.state.dataMovie)}
                    <div className="backdrop-container">
                        
                        <img className='movie-backdrop' 
                            src={`https://image.tmdb.org/t/p/original${this.state.backdrop}`} 
                            alt='movie-pic'
                        />

                        <span className="movie-title">
                            <h1 className="text">
                                {this.state.dataMovie.display_title}
                            </h1>
                        </span>
                        
                    </div>
                    <div className="big-container">
                        
                        <div className="article-container"
                            // dangerouslySetInnerHTML=
                            //     {{__html: DOMPurify.sanitize(this.state.article)}}
                        >
                            {Parser(this.state.article)}
                        </div>

                    </div>
                    
                </div>
            ) 
        } else {
            return (
                <h1>insert loading page later</h1>
            )
        }
        
    }
}