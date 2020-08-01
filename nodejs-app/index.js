const express = require("express");
const app = express();
var cors = require('cors');
app.options('*', cors()); // include before other routes
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
