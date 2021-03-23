const express = require("express");
let router = express.Router();
const axios = require("axios");
const API_KEY = "wqeDmddiHHUDTx7GN0m7cZLepTEnYuFI";


const retrieve = (req, res, next) => {
    const query = req.params.searchquery;
    axios
    .get(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${query}&api-key=${API_KEY}`)
    .then(response => {
        console.log(response.data);
    })
    next();
}




router
 .route('/:searchquery')
 .post(retrieve, (req, res) => {
     res.send("hey there");
 })

module.exports = router;