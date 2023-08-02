const express = require("express");
const { router } = require("./utils.js/routeAnnotation");
const FilmesController = require("./Products.controller");

const app = express();
app.use(express.json());
app.use(router);

app.get("/v1/snacks/check-live", (req, res) => {
  res.send("i`m live and breathing");
});