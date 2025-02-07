"use strict";

const PORT = 3000;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();


/*app.get("/styles/tweets.css", (req, res) => {
  res.type("text/css");
  res.sendFile(__dirname + "/public/styles/tweets.css");
});
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = require("./lib/in-memory-db");
const DataHelpers = require("./lib/data-helpers.js")(db);
require("./lib/date-adjust")();
const tweetsRoutes = require("./routes/tweets")(DataHelpers);

app.use("/tweets", tweetsRoutes);

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
