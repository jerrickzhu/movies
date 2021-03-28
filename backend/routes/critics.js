const express = require("express");
const router = express.Router();
const middlewareNYT = require("../middleware/retrieveDataNYT");
const middlewareTMDB = require("../middleware/retrieveImageTMDB");

router.
 route('/:movie')
 .post(middlewareNYT.getArticle, middlewareTMDB.getBackdrop, (req, res) => {
     res.send(res.locals);
 })

module.exports = router;