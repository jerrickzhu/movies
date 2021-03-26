const express = require("express");
let router = express.Router();
const retrieveImage = require("../middleware/retrieveImageTMDB");

router
.route('/:movietitle')
.post(retrieveImage, (req, res) => {
    res.send(res.locals);
});

module.exports = router;