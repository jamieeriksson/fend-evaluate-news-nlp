import { getArticleAnalysis } from "./js/formHandler";
import "./styles/styles.scss";

function changeUI(data) {
  console.log(data);
  const { url, title } = data.article;
  const {
    polarity,
    subjectivity,
    polarityConfidence,
    subjectivityConfidence,
  } = data.sentiment;

  document.getElementById("polarity");
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
