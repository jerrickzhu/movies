const express = require("express");
let router = express.Router();
const retrieve = require("../middleware/retrieveData");


router
 .route('/:searchquery')
 .get(retrieve, (req, res) => {
     res.send(res.locals.searchResultsNYT.data);
 })

module.exports = router;