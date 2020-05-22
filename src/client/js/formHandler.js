async function getArticleAnalysis() {
  const response = await fetch("http://localhost:8000/all");
  const data = await response.json();
  console.log(data);
}

async function getArticleExtraction() {
  const url =
    "https://ultiworld.com/2020/05/21/callahan-2020-what-weve-learned-from-the-womens-division-race/";
  const article = { url };
  const response = await fetch("http://localhost:8000/article", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  });
  const data = await response.json();
  console.log(data);
}

export { getArticleAnalysis };
export { getArticleExtraction };
