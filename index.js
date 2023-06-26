const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connectDB = require("./config/database");
const projectsRouter = require("./routes/projects");
require("dotenv").config();
const port = 8000;
// Set up static file serving
app.use(express.static("assets"));

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set("view engine", "ejs");

express.urlencoded({ extended: true });

// Override POST method to support DELETE method
app.use((req, res, next) => {
  if (req.query._method === "DELETE") {
    req.method = "DELETE";
    req.url = req.path;
  }
  next();
});

// Use the routes
app.use("/", projectsRouter);

// Start the server
const start = async () => {
connectDB(process.env.Mongo_Url).then(() => {
  app.listen(process.env.port, () => {
    console.log(`Listening on port ${process.env.port}`);
  });
});
