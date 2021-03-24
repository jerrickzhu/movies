const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const app = express();
const port = 4000;
const search = require("./routes/search");
const cors = require("cors");
const MOVIE_DB_API = "bad8318dfb9fcecf3ef3574a242514d3";

app.use(cors({origin: 'http://localhost:3000'}));
app.use('/search', search);

app.get('/', (req, res) => {
    const url = "https://www.nytimes.com/2016/06/10/movies/the-conjuring-2-review.html";
    axios.get(url)
    .then(response => {
        const $ = cheerio.load(response.data);
        const dataContainer = [];
        $('.StoryBodyCompanionColumn').each(function(i, elm) {
            dataContainer.push($(this).html());
        })
        let data = ""
        for (let i = 0; i < dataContainer.length; i++) {
            data += dataContainer[i]
        }
        res.send({text: data});
    });
})

app.get('/testing', (req, res) => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_DB_API}&language=en-US&query=the%20conjuring&page=1`)
    .then(response => {
        const id = response.data.results[0].id;
        res.send(`got it: ${id}`);
    })
})

app.listen(port, () => {
    console.log(`listening at ${port}`);
})