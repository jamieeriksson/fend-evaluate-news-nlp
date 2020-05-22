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
  // Extract article body
  const article = request.body;

  textapi.extract(article, function (error, response, rateLimits) {
    if (error === null) {
      // console.log(response);
      console.log(rateLimits);
      let articleAnalysis = { url: article.url, title: response.title };

      // Sentiment analysis
      textapi.sentiment(
        {
          text: response.article,
          mode: "document",
        },
        function (error, response) {
          if (error === null) {
            articleAnalysis.polarity = response.polarity;
            articleAnalysis.subjectivity = response.subjectivity;
            articleAnalysis.polarity_confidence = response.polarity_confidence;
            articleAnalysis.subjectivity_confidence =
              response.subjectivity_confidence;
            console.log(articleAnalysis);
          }
        }
      );
    }
  });
});

// POST route to store desired Aylien API information in object
app.post("");
