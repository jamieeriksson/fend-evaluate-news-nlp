import { getArticleAnalysis } from "./js/getArticleAnalysis";
import { incorrectURL } from "./js/incorrectURL";
import { checkURL } from "./js/incorrectURL";
import { resetUI } from "./js/UIchanges";
import { changeUI } from "./js/UIchanges";
import "./styles/styles.scss";

async function analyze(event) {
  event.preventDefault();

  resetUI();
  const articleUrl = document.getElementById("urlField").value;
  let message = "";

  const valid = checkURL(articleUrl);

  if (valid) {
    try {
      const response = await getArticleAnalysis(articleUrl);
      changeUI(response);
    } catch (error) {
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
