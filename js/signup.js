/*
    The function signupSubmit() is called when the form "order" is submitted.
    It should run some validations and show the output.
*/

function signupSubmit() {
  //1. Fetch all the input

  let eName = document.getElementById("eName").value;
  let eEmail = document.getElementById("eEmail").value;
  let ePassword = document.getElementById("ePassword").value;

  eName = eName.trim();
  eEmail = eEmail.trim();
  ePassword = ePassword.trim();

  //2. Do validation
  let errorsForm = "";
  let validName = /^[A-Za-z]+$/;
  let validEmail = /^\w*@\w*(\.\w{3})+$/;

  if (eName === "" || eEmail === "" || ePassword === "") {
    errorsForm +=
      "Please give us your Name, Email and Password";
  }

  if (!validName.test(eName)) {
    errorsForm += "Please enter letters for your Name <br>";
  }

  if (!validEmail.test(eEmail)) {
    errorsForm += "Please enter a valid Email (minumum: X@X.XXX)<br>";
  }

  //3. Output - error message or data
  if (errorsForm !== "") {
    document.getElementById("errorsForm").innerHTML = errorsForm;
  } else {

    document.getElementById("errorsForm").innerHTML = errorsForm;    errorsForm += "";

    let infoUser = `
        Your Data: <br><br>
        Name: ${eName}<br>
        Email: ${eEmail}<br>
        Password: ${ePassword}<br><br>
        `;

    //clear errors and show output
    document.getElementById("errorsForm").innerHTML = "";
    document.getElementById("infoUser").innerHTML = infoUser;
  }
  // Return false will stop the form from submitting and keep it on the current page.
  return false;
}