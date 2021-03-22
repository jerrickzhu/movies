const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const app = express();
const port = 4000;

app.set('view engine');

app.get('/', (req, res) => {
    const url = "https://www.nytimes.com/2016/06/10/movies/the-conjuring-2-review.html";
    axios.get(url)
    .then(response => {
        const $ = cheerio.load(response.data);
        const data = $('.StoryBodyCompanionColumn').text()
        res.send(data);

    });
    
})

app.get('/testing', (req, res) => {
    res.send({post: "workin ova here!"});
})

app.listen(port, () => {
    console.log(`listening at ${port}`);
})