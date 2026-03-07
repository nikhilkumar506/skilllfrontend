console.log("core/auth.js loaded");

/* ===== BACKEND URL ===== */
const API_URL = "https://skilllcertify-backend.onrender.com/api/auth";

/* ================= REGISTER ================= */
window.registerUser = async function (data) {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    return await res.json();
  } catch (err) {
    console.error("Register error:", err);
    return { message: "Server error" };
  }
};

/* ================= LOGIN ================= */
window.loginUser = async function (data) {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    return await res.json();
  } catch (err) {
    console.error("Login error:", err);
    return { message: "Server error" };
  }
};