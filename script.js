// Ensure JS runs after page loads
document.addEventListener("DOMContentLoaded", function() {

  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const attendanceBtn = document.getElementById("attendanceBtn");

  loginBtn.addEventListener("click", function() {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();

    if(user === "admin" && pass === "1234") {
      // Show admin page, hide login
      document.getElementById("loginPage").style.display = "none";
      document.getElementById("adminPage").style.display = "block";
      document.getElementById("status").innerText = "";
    } else {
      alert("Wrong Username or Password");
    }
  });

  attendanceBtn.addEventListener("click", function() {
    document.getElementById("status").innerText = "✅ Attendance Marked Successfully";
  });

  logoutBtn.addEventListener("click", function() {
    document.getElementById("loginPage").style.display = "block";
    document.getElementById("adminPage").style.display = "none";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  });

});
