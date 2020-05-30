// Check if submitted url has http:// or https:// included in url
function checkURL(url) {
  const urlCheck = /^https?:\/\/.+/i;
  return urlCheck.test(url);
}

// Change UI to reflect errors caused by an incorrect url submitted
function incorrectURL(msg) {
  const errorMsg = document.getElementById("error-msg");
  const inputBox = document.getElementById("urlField");

  errorMsg.textContent = msg;
  inputBox.classList.add("error-url");
  errorMsg.style.display = "block";
  inputBox.style.display = "inline";
}

export { incorrectURL };
export { checkURL };
