import { auth, db } from "./firebase.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const bookingForm = document.getElementById("bookingForm");
const bookingList = document.getElementById("bookingList");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    loadBookings(user.uid);
  }
});

// Add Booking
bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const serviceType = document.getElementById("serviceType").value;
  const projectDetails = document.getElementById("projectDetails").value;

  await addDoc(collection(db, "bookings"), {
    userId: auth.currentUser.uid,
    serviceType: serviceType,
    projectDetails: projectDetails,
    status: "Pending"
  });

  alert("Booking Submitted!");
  bookingForm.reset();
  loadBookings(auth.currentUser.uid);
});

// Load User Bookings
async function loadBookings(uid) {
  bookingList.innerHTML = "";

  const q = query(collection(db, "bookings"), where("userId", "==", uid));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    let statusClass = "";

    if (data.status === "Pending") statusClass = "status-pending";
    if (data.status === "In Progress") statusClass = "status-progress";
    if (data.status === "Completed") statusClass = "status-completed";
    
    bookingList.innerHTML += 
      <div class="card">
        <h4>${data.serviceType}</h4>
        <p>${data.projectDetails}</p>
        <strong class="${statusClass}">Status: ${data.status}</strong>
      </div>
    ;
  });
}

// Logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "index.html";
});
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});
document.getElementById("notifCount").innerText=3;