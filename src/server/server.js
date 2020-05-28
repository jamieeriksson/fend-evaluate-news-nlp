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

// Functions
function extractArticle(document) {
  return new Promise((resolve, reject) => {
    textapi.extract(document, function (error, response, rateLimits) {
      if (error === null) {
        let articleExtract = {};
        console.log("second");
        console.log(rateLimits);
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

// GET route to send stored article information to client side
app.get("/all", (request, response) => {
  response.send(articleInfo);
});

// Extract article body
app.post("/article", async (request, response) => {
  // Extract article body
  const article = request.body;
  try {
    const extraction = await extractArticle(article);
    console.log("extraction success!");
    const articleAnalysis = await analyzeArticle(extraction.body);
    console.log("sentiment success!");
    articleInfo = {
      article: { url: extraction.url, title: extraction.title },
      sentiment: articleAnalysis,
    };
    console.log(articleInfo);
    response.send(articleInfo);
  } catch (error) {
    console.log(`There was an error: ${error}`);
    response.status(400).send("Bad Request");
  }
});

// POST route to store desired Aylien API information in object
app.post("");
