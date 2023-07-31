/*
    The function loginSubmit() is called when the form "order" is submitted.
    It should run some validations and show the output.
*/
function loginSubmit() {
  //1. Fetch all the input

  let eEmail = document.getElementById("eEmail").value;
  let ePassword = document.getElementById("ePassword").value;

  eEmail = eEmail.trim();
  ePassword = ePassword.trim();


  //2. Do validation
  let errorsForm = "";
  let validEmail = /^\w*@\w*(\.\w{3})+$/;

  if (eEmail === "" || ePassword === "") {
    errorsForm +=
      "Please share us your Email and Password";
  }

  if (!validEmail.test(eEmail)) {
    errorsForm += "Please enter a valid Email (minumum: X@X.XXX)<br>";
  }

  //3. Output - error message or Data
  if (errorsForm !== "") {
    document.getElementById("errorsForm").innerHTML = errorsForm;
  } else {

    document.getElementById("errorsForm").innerHTML = errorsForm;    errorsForm +=
    "holiii desde else";

    let infoUser = `
        Your Data: <br><br>
        Email: ${eEmail}<br>
        Password: ${ePassword}<br><br>
        `;

    //clear errors and show output
   document.getElementById("errorsForm").innerHTML = "";
   window.location.href = "http://127.0.0.1:5500/index.html";
   // document.getElementById("infoUser").innerHTML = infoUser;
  }
  // Return false will stop the form from submitting and keep it on the current page.
  return false;
}