import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const loginNav = document.getElementById("loginNav");
const registerNav = document.getElementById("registerNav");
const dashboardNav = document.getElementById("dashboardNav");
const adminNav = document.getElementById("adminNav");
const logoutNav = document.getElementById("logoutNav");
const profileNav = document.getElementById("profileNav");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, async (user) => {

  if (user) {
    // Hide Login/Register
    loginNav.style.display = "none";
    registerNav.style.display = "none";

    // Show Logout & Profile
    logoutNav.style.display = "block";
    profileNav.style.display = "block";

    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.data();

    if (userData.role === "admin") {
      adminNav.style.display = "block";
      dashboardNav.style.display = "none";
    } else {
      dashboardNav.style.display = "block";
      adminNav.style.display = "none";
    }

  } else {
    // Not logged in
    loginNav.style.display = "block";
    registerNav.style.display = "block";

    dashboardNav.style.display = "none";
    adminNav.style.display = "none";
    logoutNav.style.display = "none";
    profileNav.style.display = "none";
  }
});

// Logout
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "index.html";
  });
}