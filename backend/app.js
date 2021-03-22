const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const request = require("request");
const app = express();
const port = 4000;

app.set('view engine');

app.get('/', (req, res) => {
    const url = "https://www.nytimes.com/2016/06/10/movies/the-conjuring-2-review.html";
    if (url) {
        console.log("now scraping: " + url);
        request(url, function(err, response, html) {
            let data;
            let title;
            if (!err) {
                var $ = cheerio.load(html);
                title = $('h1');
                data = $("[name=articleBody]").html();
            }
            res.send(data);
        })
    } else {
        res.send("error!");
    }
    
})

app.get('/testing', (req, res) => {
    res.send({post: "workin ova here!"});
})

app.listen(port, () => {
    console.log(`listening at ${port}`);
})