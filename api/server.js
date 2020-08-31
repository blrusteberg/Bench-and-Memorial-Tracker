require("dotenv").config();
const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const port = process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");

const swaggerDocument = YAML.load("./docs/swagger.yaml");
const memorialRoutes = require("./routes/memorials.js");
const memorialTypeRoutes = require("./routes/memorialTypes.js");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.get("/", (req, res) => {
  res.status(308);
  res.redirect("/api/docs");
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/memorials", memorialRoutes);
app.use("/memorials/types", memorialTypeRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
