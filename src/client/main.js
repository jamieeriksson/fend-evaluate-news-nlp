import { getArticleAnalysis } from "./js/formHandler";
import "./styles/styles.scss";

function changeUI(data) {
  console.log(data);
  const { url, title } = data.article;
  let text = document.createTextNode(title);
  let elmt = document.getElementById("article-title");
  elmt.appendChild(text);
  Object.keys(data.sentiment).forEach((key) => {
    text = document.createTextNode(data.sentiment[key]);
    elmt = document.getElementById(`${key}`);
    elmt.appendChild(text);
  });
}

async function analyze(event) {
  event.preventDefault();
  const response = await getArticleAnalysis();
  try {
    changeUI(response);
  } catch (error) {
    console.log("Error analyzing article:", error);
  }
}

document.getElementById("articleForm").addEventListener("submit", analyze);
