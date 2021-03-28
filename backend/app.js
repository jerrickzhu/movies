const express = require("express");
const app = express();
const port = 4000;
const search = require("./routes/search");
const retrieveImage = require("./routes/movieimage");
const criticSays = require("./routes/critics");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use('/search', search);
app.use('/movieimage', retrieveImage);
app.use('/critic', criticSays);

app.listen(port, () => {
    console.log(`listening at ${port}`);
})