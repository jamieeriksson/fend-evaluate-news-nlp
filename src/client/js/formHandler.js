async function getArticleAnalysis() {
  const url = document.getElementById("urlField").value;
  const response = await fetch("http://localhost:8000/article", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error with API request:", error);
  }
}

export { getArticleAnalysis };
