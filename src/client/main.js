import { getArticleAnalysis } from "./js/formHandler";
import { incorrectURL } from "./js/incorrectURL";
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
  const articleUrl = document.getElementById("urlField").value;
  const urlCheck = /^https?:\/\/.+/i;

  const errorMsg = document.getElementById("error-msg");
  const inputBox = document.getElementById("urlField");
  let msg = "";

  if (urlCheck.test(articleUrl)) {
    errorMsg.style.display = "none";
    inputBox.classList.remove("error-url");
    try {
      const response = await getArticleAnalysis(articleUrl);
      console.log(response);
      changeUI(response);
    } catch (error) {
      console.log("Error analyzing article:", error);
      msg = "Could not analyze article. Double check the URL and try again.";
      errorMsg.textContent = msg;
      inputBox.classList.add("error-url");
      errorMsg.style.display = "block";
      inputBox.style.display = "inline";
    }
  } else {
    msg =
      "Article URL must contain http:// or https:// at beginning of address.";
    errorMsg.textContent = msg;
    inputBox.classList.add("error-url");
    errorMsg.style.display = "block";
    inputBox.style.display = "inline";
  }
}

document.getElementById("articleForm").addEventListener("submit", analyze);
