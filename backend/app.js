const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const app = express();
const port = 4000;
const search = require("./routes/search");
const cors = require("cors");

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
    res.send({post: "workin ova here!"});
})

app.listen(port, () => {
    console.log(`listening at ${port}`);
})