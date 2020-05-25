import { getArticleAnalysis } from "./js/formHandler";
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
  const response = await getArticleAnalysis();
  try {
    changeUI(response);
  } catch (error) {
    console.log("Error analyzing article:", error);
  }
}

document.getElementById("articleForm").addEventListener("submit", analyze);
