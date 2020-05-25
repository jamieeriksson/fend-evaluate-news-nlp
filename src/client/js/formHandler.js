// async function getArticleInfo() {
//   const response = await fetch("http://localhost:8000/all");
//   const data = await response.json();
//   console.log(data);
// }

async function getArticleAnalysis() {
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
  try {
    console.log(response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error with API request:", error);
  }
}

// function callApi () {
//   getArticleExtraction()
// }

export { getArticleAnalysis };
// export { getArticleInfo };
