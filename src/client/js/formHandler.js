function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;
  checkForName(formText);

  //   const apiEndpoint = "https://api.aylien.com/api/v1";

  console.log("::: Form Submitted :::");
  fetch("http://localhost:8080/test")
    .then((res) => res.json())
    .then(function (res) {
      document.getElementById("results").innerHTML = res.message;
    });
}

export { handleSubmit };
