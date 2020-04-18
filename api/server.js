const uuid = require("uuid");
const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const memorials = require("./data/memorials.json");
const memorialTypes = require("./data/memorial-types.json");
const port = process.env.PORT || 1337;
const cors = require("cors");
const fs = require("fs");

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(308);
  res.redirect("/api/docs");
});

app.get("/api/memorials", (req, res) => {
  res.status(200);
  res.send(memorials);
});

app.get("/api/memorials/types", (req, res) => {
  res.status(200);
  res.send(memorialTypes);
});

app.post("/api/memorials", (req, res) => {
  let typeNames = [];
  memorialTypes.memorialTypes.forEach((type) => {
    typeNames.push(type.name);
  });
  req.body.memorials.forEach((memorial) => {
    if (!(memorial.type && typeNames.includes(memorial.type))) {
      res.status(400);
      res.send("not a valid memorial type");
    }

    if (memorial.attributes.length == 0) {
      res.status(400);
      res.send("memorial attributes are not valid");
    }
    memorial.uuid = uuid.v4();
  });

  addMemorials(req.body.memorials);
  res.status(201);
  const plural = req.body.memorials.length > 1 ? "s" : "";
  res.send(`${req.body.memorials.length} memorial${plural} saved successfully`);
});

app.post("/api/memorials/types", (req, res) => {
  if (!req.body.name) {
    res.status(400);
    res.send("invalid memorial type name");
  }
  if (req.body.attributes.length == 0) {
    res.status(400);
    res.send("invalid memorial type attributes");
  }

  addMemorialType(req.body);

  res.status(201);
  res.send("memorial type saved successfully");
});

app.listen(port, () => console.log(`Listening on port ${port}...`));

function addMemorials(newMemorials) {
  jsonReader("./data/memorials.json", (err, memorials) => {
    if (err) {
      console.log("Error reading file:", err);
      return;
    }

    memorials.memorials = memorials.memorials.concat(newMemorials);
    fs.writeFile(
      "./data/memorials.json",
      JSON.stringify(memorials, null, 2),
      (err) => {
        if (err) console.log("Error writing file:", err);
      }
    );
  });
}

function addMemorialType(newMemorialType) {
  jsonReader("./data/memorial-types.json", (err, memorialTypes) => {
    if (err) {
      console.log("Error reading file:", err);
      return;
    }
    memorialTypes.memorialTypes.push(newMemorialType);
    fs.writeFile(
      "./data/memorial-types.json",
      JSON.stringify(memorialTypes, null, 2),
      (err) => {
        if (err) console.log("Error writing file:", err);
      }
    );
  });
}

function jsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}
