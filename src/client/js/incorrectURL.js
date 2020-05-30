function checkURL(url) {
  const urlCheck = /^https?:\/\/.+/i;
  return urlCheck.test(url);
}

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
