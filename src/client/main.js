import { getArticleAnalysis } from "./js/formHandler";
import "./styles/styles.scss";

function changeUI(data) {
  const {
    url,
    title,
    polarity,
    subjectivity,
    polarityConfidence,
    subjectivityConfidence,
  } = data;
  document.getElementById("polarity");
}

getArticleAnalysis()
  .then((data) => {
    console.log(data);
    changeUI(data);
  })
  .catch((error) => {
    console.log("Error analyzing article:", error);
  });

// getArticleAnalysis();
// getArticleExtraction();
