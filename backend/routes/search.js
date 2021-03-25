const express = require("express");
let router = express.Router();
const retrieve = require("../middleware/retrieveDataNYT");


router
 .route('/:searchquery')
 .get(retrieve, (req, res) => {
     res.send(res.locals.searchResultsNYT);
 })

module.exports = router;