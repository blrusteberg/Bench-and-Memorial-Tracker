const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const memorials = require("./data/memorials.json");
const port = process.env.PORT || 1337;
const cors = require("cors");

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());

app.get("/", (req, res) => {
  res.status(308);
  res.redirect("/api/docs");
});

app.get("/api/memorials", (req, res) => {
  res.status(200);
  res.send(memorials);
});

app.get("/api/memorials/:id", (req, res) => {
  res.status(200);
  let mem = getMemorialById(req.params.id);
  console.log(mem);
  res.send(mem);
});

app.listen(port, () => console.log(`Listening on port ${port}...`));

function getMemorialById(id) {
  let m;
  memorials.memorials.forEach((memorial) => {
    if (memorial.id == id) {
      m = memorial;
    }
  });
  return typeof m == "undefined" ? "Memorial not found" : m;
}

function getMemorialByType(type) {
  let m = [];
  memorials.memorials.forEach((memorial) => {
    if (memorial.type == type) {
      m.push(memorial);
    }
  });
  return m;
}
