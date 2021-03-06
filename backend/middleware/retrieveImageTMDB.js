const axios = require("axios");
const MOVIE_DB_API = "bad8318dfb9fcecf3ef3574a242514d3";

const getBackdrop = (req, res, next) => {
    const movieID = req.body.movieID;
    axios
    .get(`https://api.themoviedb.org/3/movie/${movieID}/images?api_key=${MOVIE_DB_API}`)
    .then(response => {
        let filepath = response.data.backdrops[0].file_path;
        res.locals.backdrop = filepath;
        next();
    })
    .catch(err => {
        throw err;
    });
}

const retrievePoster = (req, res, next) => {
    let resultList = [];
    let picList = [];
    let titleList = [];
    let idList = [];
    const namesOfMovies = req.body.names;

    function getData(index) {
        return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_DB_API}&language=en-US&query=${namesOfMovies[index]}`)
    }

    for (let index = 0; index < namesOfMovies.length; index++) {
        resultList.push(getData(index));
    }

    Promise.all(resultList).then(results => {
        for (let index = 0; index < namesOfMovies.length; index++) {
            picList.push(results[index].data.results[0].poster_path);
            titleList.push(results[index].data.results[0].title);
            idList.push(results[index].data.results[0].id);
        }
        res.locals.picList = picList;
        res.locals.titleList = titleList;
        res.locals.idList = idList;
        next();
    });   
}

module.exports = {
    retrievePoster: retrievePoster,
    getBackdrop: getBackdrop
};