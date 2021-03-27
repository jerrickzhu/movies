const express = require("express");
let router = express.Router();
const middleware = require("../middleware/retrieveImageTMDB");

router
.route('/:movietitle')
.post(middleware.retrievePoster, (req, res) => {
    res.send(res.locals);
});

module.exports = router;