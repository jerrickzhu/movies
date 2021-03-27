const axios = require("axios");
const cheerio = require("cheerio");
const API_KEY = "wqeDmddiHHUDTx7GN0m7cZLepTEnYuFI";


const retrieveEntireMovieSearch = (req, res, next) => {
    const query = encodeURIComponent(req.params.searchquery);
    axios
    .get(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${query}&api-key=${API_KEY}`)
    .then(response => {
        res.locals.searchResultsNYT = response.data;
        next();
    })  
}



const getArticle = (req, res, next) => {
    const articleURL = req.body.articleData;
    axios
    .get(articleURL)
    .then(response => {
        const $ = cheerio.load(response.data);
        const dataContainer = [];
        $('.StoryBodyCompanionColumn').each(function(i, elm) {
            dataContainer.push($(elm).html());
        });
        let html = "";
        for (let i = 0; i < dataContainer.length; i++) {
            html += dataContainer[i];
        }
        if (html) {
            res.locals.articleHTML = html;
        }
        next();
    })
    .catch(err => {
        throw err;
    });
}


module.exports = {
    retrieveEntireMovieSearch: retrieveEntireMovieSearch,
    getArticle: getArticle
};
