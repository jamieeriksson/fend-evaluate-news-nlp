import { getArticleAnalysis } from "./js/formHandler";
import { incorrectURL } from "./js/incorrectURL";
import { resetUI } from "./js/UIchanges";
import { changeUI } from "./js/UIchanges";
import "./styles/styles.scss";

function changeUI(data) {
  console.log(data);
  const { url, title } = data.article;
  let elmt = document.getElementById("article-title");
  elmt.textContent = title;
  Object.keys(data.sentiment).forEach((key) => {
    elmt = document.getElementById(`${key}`);
    elmt.textContent = data.sentiment[key];
  });
}

async function analyze(event) {
  event.preventDefault();

  resetUI();

  const articleUrl = document.getElementById("urlField").value;
  const urlCheck = /^https?:\/\/.+/i;
  let message = "";

  if (urlCheck.test(articleUrl)) {
    try {
      const response = await getArticleAnalysis(articleUrl);
      console.log(response);
      changeUI(response);
    } catch (error) {
      console.log("Error analyzing article:", error);
      message =
        "Could not analyze article. Double check the URL and try again.";
      incorrectURL(message);
    }
  } else {
    message =
      "Article URL must contain http:// or https:// at beginning of address.";
    incorrectURL(message);
  }
}

document.getElementById("articleForm").addEventListener("submit", analyze);
