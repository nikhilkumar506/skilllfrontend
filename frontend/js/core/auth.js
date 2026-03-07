console.log("auth.js loaded");

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
    console.error(err);
    return { error: "Server error" };
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
    console.error(err);
    return { error: "Server error" };
  }
};