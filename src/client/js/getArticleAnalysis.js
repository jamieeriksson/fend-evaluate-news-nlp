// Make a fetch call to the server side in order to obtain API information
async function getArticleAnalysis(url) {
  try {
    const response = await fetch("http://localhost:8000/article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Invalid URL");
  }
}

export { getArticleAnalysis };
