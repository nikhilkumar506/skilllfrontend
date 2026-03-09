console.log("guards.js loaded");

setTimeout(() => {

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Session expired. Please login again.");
    window.location.href = "../auth/login.html";
  }

}, 500);