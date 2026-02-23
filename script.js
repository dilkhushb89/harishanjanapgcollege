// 🔥 Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

// 🔥 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDKRo7HBTiWdkovLpNXMazKyxhtKzmFl_g",
  authDomain: "harish-anjana-pg-college.firebaseapp.com",
  projectId: "harish-anjana-pg-college",
  storageBucket: "harish-anjana-pg-college.firebasestorage.app",
  messagingSenderId: "855592419614",
  appId: "1:855592419614:web:497b42fddbe3347184c90f"
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔐 LOGIN FUNCTION
window.login = function () {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  if (!email || !password) {
    message.innerText = "Please enter email and password!";
    message.style.color = "red";
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      message.style.color = "green";
      message.innerText = "Login Successful ✅";

      // 🔥 Redirect only if admin.html exists
      setTimeout(() => {
        window.location.href = "admin.html";
      }, 1000);
    })
    .catch((error) => {
      message.style.color = "red";
      message.innerText = error.message;
    });
};

// 🔒 Auto protect admin page
if (window.location.pathname.includes("admin.html")) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "index.html";
    }
  });
}

// 🚪 Logout Function
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};
