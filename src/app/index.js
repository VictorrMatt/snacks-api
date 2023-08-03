const express = require("express");
const { router } = require("./utils.js/routeAnnotation");
const FilmesController = require("./Products.controller");

const app = express();
const port = 4002;
app.use(express.json());
app.use(router);
app.timeout = 60000;

app.listen(port, () => {
  console.log(`Server Film Fans is running on port ${port}`);
});

app.get("/v1/snacks/check-live", (req, res) => {
  res.send("i`m live and breathing");
});
