/*
    The function signupSubmit() is called when the form "order" is submitted.
    It should run some validations and show the output.
*/

function recoveryPassword() {
  //1. Fetch all the input
  let eEmail = document.getElementById("eEmail").value;
  let eId = document.getElementById("eId").value;

  eEmail = eEmail.trim();
  eId = eId.trim();

  //2. Do validation
  let errorsForm = "";
  let validEmail = /^\w*@\w*(\.\w{3})+$/;
  let validId = /^[0-9]{1,3}$/;

  if (eEmail === "" || eId === "") {
    errorsForm +=
      "Please give us your Name, Email and Password";
  }
  if (!validEmail.test(eEmail)) {
    errorsForm += "Please enter a valid Email (minumum: X@X.XXX)<br>";
  }

  if (!validId.test(eId)) {
    errorsForm += "Please enter a valid Id (only numbers, 1 to 3 digits)<br>";
  }

  //3. Output - error message or data and Math operation

  let lotery = eId.length;
  const userNums = [1,10, 100, 1000];
  let userNum = userNums[userNums.length - lotery];
  let temporaryPass = eId * userNum;

  if (errorsForm !== "") {
    document.getElementById("errorsForm").innerHTML = errorsForm;
  } else {

    document.getElementById("errorsForm").innerHTML = errorsForm;    errorsForm += "";

    let passUser = `
        Your Data: <br><br>
        Email: ${eEmail}<br>
        Id: ${eId}<br>
        Your temporary password is: ${temporaryPass}<br><br>
        `;

    //clear errors and show output
    document.getElementById("errorsForm").innerHTML = "";
    document.getElementById("passUser").innerHTML = passUser;
  }
  // Return false will stop the form from submitting and keep it on the current page.
  return false;
}