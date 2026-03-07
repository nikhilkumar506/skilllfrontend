console.log("core/auth.js loaded");

const API_URL = "https://skilllcertify-backend.onrender.com/api/auth";

/* ================= REGISTER ================= */
async function registerUser(data) {
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
    return { error: "Server error" };
  }
}

/* ================= LOGIN ================= */
async function loginUser(data) {
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
    return { error: "Server error" };
  }
}