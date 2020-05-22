const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const AYLIENTextAPI = require("aylien_textapi");
const textapi = new AYLIENTextAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});

const app = express();

// Set a static folder for webpack bundled files
app.use(express.static("build"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.resolve("build/index.html"));
});

const port = process.env.port || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));

// Aylien API routes
let articleInfo = {}; // Empty object to hold nlp extracted information from Aylien

// GET route to send stored article information to client side
app.get("/all", (request, response) => {
  response.send(articleInfo);
});

// Extract article body
app.post("/article", (request, response) => {
  const url = request.body;
  console.log(url);
  const extraction = textapi.extract(url, function (error, response) {
    if (error === null) {
      console.log(response);
    }
  });
  console.log(extraction);
  response.send(extraction);
});

// POST route to store desired Aylien API information in object
app.post("");
