const express = require("express");
let router = express.Router();
const middleware = require("../middleware/retrieveDataNYT");


router
 .route('/:searchquery')
 .get(middleware.retrieveEntireMovieSearch, (req, res) => {
     res.send(res.locals.searchResultsNYT);
 })

module.exports = router;