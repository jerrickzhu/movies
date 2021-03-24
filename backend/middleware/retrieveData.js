const axios = require("axios");
const API_KEY = "wqeDmddiHHUDTx7GN0m7cZLepTEnYuFI";


const retrieve = (req, res, next) => {
    const query = encodeURIComponent(req.params.searchquery);
    axios
    .get(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${query}&api-key=${API_KEY}`)
    .then(response => {
        res.locals.searchResultsNYT = response.data;
        next();
    })
    
}


module.exports = retrieve;

