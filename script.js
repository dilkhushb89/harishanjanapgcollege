function login() {
  var user = document.getElementById("username").value;
  var pass = document.getElementById("password").value;

  if (user === "admin" && pass === "1234") {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("adminPage").style.display = "block";
  } else {
    alert("Wrong Username or Password");
  }
}

function markAttendance() {
  document.getElementById("status").innerText = "Attendance Marked Successfully";
}

function logout() {
  document.getElementById("adminPage").style.display = "none";
  document.getElementById("loginPage").style.display = "block";
}
