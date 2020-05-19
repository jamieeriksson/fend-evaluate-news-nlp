const path = require("path");
const express = require("express");

const app = express();

// Set a static folder for webpack bundled files
app.use(express.static("build"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("build/index.html"));
});

const port = process.env.port || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));
