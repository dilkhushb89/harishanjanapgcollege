import { getAuth, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
const auth = getAuth();

window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      document.getElementById("message").innerText = "Login Successful ✅";
    })
    .catch((error) => {
      document.getElementById("message").innerText = error.message;
    });
};
let total = 0;
let presentCount = 0;
let chart;

// 🔐 LOGIN
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "admin" && pass === "1234") {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
        loadData();
    } else {
        alert("Invalid Login");
    }
}

// ➕ ADD ATTENDANCE
function addAttendance() {
    let date = document.getElementById("date").value;
    let name = document.getElementById("studentName").value;
    let status = document.getElementById("status").value;

    if (date === "" || name === "") {
        alert("Please enter date and student name");
        return;
    }

    total++;
    if (status === "Present") {
        presentCount++;
    }

    let list = document.getElementById("attendanceList");
    let li = document.createElement("li");
    li.textContent = date + " - " + name + " - " + status;
    list.appendChild(li);

    saveData();
    updatePercentage();
    drawChart();

    document.getElementById("studentName").value = "";
}

// 📊 UPDATE %
function updatePercentage() {
    let percentage = total === 0 ? 0 :
        ((presentCount / total) * 100).toFixed(2);

    document.getElementById("percentage").innerText =
        "Attendance Percentage: " + percentage + "%";
}

// 💾 SAVE
function saveData() {
    let data = {
        total: total,
        present: presentCount,
        list: document.getElementById("attendanceList").innerHTML
    };
    localStorage.setItem("attendanceData", JSON.stringify(data));
}

// 📂 LOAD
function loadData() {
    if (localStorage.getItem("attendanceData")) {
        let data = JSON.parse(localStorage.getItem("attendanceData"));
        total = data.total;
        presentCount = data.present;
        document.getElementById("attendanceList").innerHTML = data.list;
        updatePercentage();
        drawChart();
    }
}

// 📈 CHART
function drawChart() {
    let ctx = document.getElementById('attendanceChart').getContext('2d');

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Present', 'Absent'],
            datasets: [{
                data: [presentCount, total - presentCount],
                backgroundColor: ['green', 'red']
            }]
        }
    });

}
