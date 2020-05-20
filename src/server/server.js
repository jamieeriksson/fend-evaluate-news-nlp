const path = require("path");
const express = require("express");
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

app.get("/", (req, res) => {
  res.sendFile(path.resolve("build/index.html"));
});

const port = process.env.port || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));
