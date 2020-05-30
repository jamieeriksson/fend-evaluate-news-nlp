// Aylien API routes
let articleInfo = {}; // Empty object to hold nlp extracted information from Aylien

// Require statements
const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
const AYLIENTextAPI = require("aylien_textapi");
const textapi = new AYLIENTextAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});

// Start instance of and configure app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Set a static folder for webpack bundled files
app.use(express.static("build"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("build/index.html"));
});

// Server port
const port = process.env.port || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));

/** Aylien API call functions.
 * "extractArticle()" extracts the main body of the article submitted.
 * "analyzeArticle()" returns a sentiment analysis of the article. **/
function extractArticle(document) {
  return new Promise((resolve, reject) => {
    textapi.extract(document, function (error, response, rateLimits) {
      if (error === null) {
        let articleExtract = {};
        articleExtract = {
          url: document.url,
          title: response.title,
          body: response.article,
        };
        resolve(articleExtract);
      } else {
        reject(error);
      }
    });
  });
}

async function analyzeArticle(body) {
  return new Promise((resolve, reject) => {
    textapi.sentiment(
      {
        text: body,
        mode: "document",
      },
      function (error, response) {
        if (error === null) {
          sentiment = {
            polarity: response.polarity,
            subjectivity: response.subjectivity,
            polarityConfidence: response.polarity_confidence,
            subjectivityConfidence: response.subjectivity_confidence,
          };
          resolve(sentiment);
        } else {
          reject(error);
        }
      }
    );
  });
}

// POST route for calling Aylien API
app.post("/article", async (request, response) => {
  const article = request.body;
  try {
    const extraction = await extractArticle(article);
    const articleAnalysis = await analyzeArticle(extraction.body);
    articleInfo = {
      article: { url: extraction.url, title: extraction.title },
      sentiment: articleAnalysis,
    };
    response.send(articleInfo);
  } catch (error) {
    response.status(400).send("Bad Request");
  }
});
