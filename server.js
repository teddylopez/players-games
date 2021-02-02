const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./db.js");
const playerRouter = require("./routers/playerRouter.js");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/players/", playerRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
