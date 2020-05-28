function resetUI() {
  // Remove error settings from input field
  const errorMsg = document.getElementById("error-msg");
  const inputBox = document.getElementById("urlField");
  errorMsg.style.display = "none";
  inputBox.classList.remove("error-url");

  // Remove previous article title
  let elmt = document.getElementById("article-title");
  elmt.textContent = "";

  // Remove previous article results
  const ids = [
    "polarity",
    "polarityConfidence",
    "subjectivity",
    "subjectivityConfidence",
  ];
  ids.forEach((id) => {
    document.getElementById(id).textContent = "";
  });
}

export { resetUI };
