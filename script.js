import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDKRo7HBTiWdkovLpNXMazKyxhtKzmFl_g",
  authDomain: "harish-anjana-pg-college.firebaseapp.com",
  projectId: "harish-anjana-pg-college",
  storageBucket: "harish-anjana-pg-college.firebasestorage.app",
  messagingSenderId: "855592419614",
  appId: "1:855592419614:web:497b42fddbe3347184c90f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "admin.html";
    })
    .catch((error) => {
      document.getElementById("message").innerText = error.message;
    });
};

window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};

window.addAttendance = async function () {
  const name = document.getElementById("studentName").value;
  const status = document.getElementById("status").value;

  if (!name) {
    alert("Enter student name");
    return;
  }

  await addDoc(collection(db, "attendance"), {
    name: name,
    status: status,
    date: new Date().toLocaleDateString()
  });

  alert("Attendance Added Successfully");
  loadAttendance();
};

async function loadAttendance() {
  const list = document.getElementById("attendanceList");
  if (!list) return;

  list.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "attendance"));

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const li = document.createElement("li");
    li.innerText = ${data.name} - ${data.status} - ${data.date};
    list.appendChild(li);
  });
}

window.onload = loadAttendance;
