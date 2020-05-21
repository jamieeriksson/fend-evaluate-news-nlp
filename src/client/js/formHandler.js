async function getArticleAnalysis() {
  const response = await fetch("http://localhost:8000/all");
  const data = await response.json();
  console.log(data);
}

export { getArticleAnalysis };
