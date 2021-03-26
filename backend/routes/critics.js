const express = require("express");
const router = express.Router();

router.
route('/:movie');

// app.get('/', (req, res) => {
//     const url = "https://www.nytimes.com/2016/06/10/movies/the-conjuring-2-review.html";
//     axios.get(url)
//     .then(response => {
//         const $ = cheerio.load(response.data);
//         const dataContainer = [];
//         $('.StoryBodyCompanionColumn').each(function(i, elm) {
//             dataContainer.push($(this).html());
//         })
//         let data = ""
//         for (let i = 0; i < dataContainer.length; i++) {
//             data += dataContainer[i]
//         }
//         res.send({text: data});
//     });
// })

module.exports = router;