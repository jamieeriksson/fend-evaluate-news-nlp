function incorrectURL(msg) {
  console.log(msg);
  const errorMsg = document.getElementById("error-msg");
  errorMsg.textContent = msg;
  errorMsg.style.display = "block";
  const inputBox = document.getElementById("urlField");
  inputBox.classList.add("error-url");
}

export { incorrectURL };
