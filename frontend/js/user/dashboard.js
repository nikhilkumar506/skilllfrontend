console.log("Dashboard JS loaded");

const authToken = localStorage.getItem("token");

const API_BASE = "https://skilllcertify-backend.onrender.com/api";

async function loadUser() {

  if (!authToken) {
    alert("Session expired. Please login again.");
    window.location.href = "../auth/login.html";
    return;
  }

  try {

    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: {
        Authorization: "Bearer " + authToken
      }
    });

    const data = await res.json();

    console.log("ME API data:", data);

    document.getElementById("userName").innerText = data.fullName;
    document.getElementById("userEmail").innerText = data.email;

  } catch (err) {

    console.error("Dashboard error:", err);

    alert("Session expired. Please login again.");

    localStorage.removeItem("token");

    window.location.href = "../auth/login.html";
  }

}

/* Logout */

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "../auth/login.html";
  });
}

loadUser();