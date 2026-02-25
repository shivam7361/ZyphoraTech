import { db } from "./firebase.js";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

let chartInstance = null;

// ===============================
// LOAD BOOKINGS + ANALYTICS
// ===============================
function loadAdminData() {

  const bookingList = document.getElementById("adminBookingList");
  const chartCanvas = document.getElementById("bookingChart");

  onSnapshot(collection(db, "bookings"), (snapshot) => {

    let pending = 0;
    let completed = 0;
    let progress = 0;

    bookingList.innerHTML = "";

    snapshot.forEach((document) => {
      const data = document.data();
      const id = document.id;

      if (data.status === "Pending") pending++;
      if (data.status === "Completed") completed++;
      if (data.status === "In Progress") progress++;

      bookingList.innerHTML += 
        <div class="card">
          <h4>${data.serviceType}</h4>
          <p>${data.projectDetails}</p>
          <p><strong>Status:</strong> ${data.status}</p>

          <select onchange="updateStatus('${id}', this.value)">
            <option value="Pending" ${data.status==="Pending"?"selected":""}>Pending</option>
            <option value="In Progress" ${data.status==="In Progress"?"selected":""}>In Progress</option>
            <option value="Completed" ${data.status==="Completed"?"selected":""}>Completed</option>
          </select>
        </div>
      ;
    });

    updateChart(chartCanvas, pending, progress, completed);

  });

}

// ===============================
// UPDATE STATUS
// ===============================
window.updateStatus = async function (id, newStatus) {
  try {
    await updateDoc(doc(db, "bookings", id), {
      status: newStatus
    });

    alert("Status Updated Successfully!");

  } catch (error) {
    console.error("Error updating status:", error);
  }
};

// ===============================
// UPDATE CHART FUNCTION
// ===============================
function updateChart(canvas, pending, progress, completed) {

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: ["Pending", "In Progress", "Completed"],
      datasets: [{
        data: [pending, progress, completed]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "#ffffff"
          }
        }
      }
    }
  });

}

// ===============================
// INIT
// ===============================
loadAdminData();