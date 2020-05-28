import { getArticleAnalysis } from "./js/getArticleAnalysis";
import { incorrectURL } from "./js/incorrectURL";
import { resetUI } from "./js/UIchanges";
import { changeUI } from "./js/UIchanges";
import "./styles/styles.scss";

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
