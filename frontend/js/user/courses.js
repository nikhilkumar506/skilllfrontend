console.log("✅ Browse Courses JS loaded");

const API_BASE = "https://skilllcertify-backend.onrender.com/api";
const token = localStorage.getItem("token");

/* ================= LOAD COURSES ================= */
async function loadCourses() {
  const grid = document.getElementById("courseGrid");

  if (!grid) {
    console.error("❌ courseGrid not found");
    return;
  }

  grid.innerHTML = "<p class='muted'>Loading courses...</p>";

  try {
    const res = await fetch(`${API_BASE}/courses`, {
      headers: token ? { Authorization: "Bearer " + token } : {}
    });

    const data = await res.json();
    console.log("📦 Courses API response:", data);

    grid.innerHTML = "";

    data.forEach(course => {
      const card = document.createElement("div");
      card.className = "course-card";

      let btnText = "Enroll";
      if (course.isEnrolled && !course.isPaid) btnText = "Unlock Course";
      if (course.isEnrolled && course.isPaid) btnText = "Start Learning";

      card.innerHTML = `
        <h3>${course.title}</h3>
        <p>${course.description || ""}</p>
        <button class="primary-btn">${btnText}</button>
      `;

      const btn = card.querySelector("button");

      // 🔥 ACTION LOGIC
      if (!course.isEnrolled) {
        btn.onclick = () => openEnrollModal(course._id, course.title);

      } else if (!course.isPaid) {
        btn.onclick = () => startPayment(course._id); // 🔥 PAYMENT

      } else {
        btn.onclick = () => goToWeek1();
      }

      grid.appendChild(card);
    });

  } catch (err) {
    console.error("❌ Load courses error:", err);
    grid.innerHTML = "<p>Failed to load courses</p>";
  }
}

/* ================= PAYMENT FUNCTION ================= */
async function startPayment(courseId) {
  try {
    const res = await fetch(`${API_BASE}/payment/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    });

    const order = await res.json();

    const options = {
      key: "rzp_test_xxxxxxxx", // 🔥 apni key daalo
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,

      name: "Zertix",
      description: "Unlock Course",

      handler: async function (response) {
        await fetch(`${API_BASE}/payment/verify-payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          },
          body: JSON.stringify({
            paymentId: response.razorpay_payment_id,
            courseId
          })
        });

        alert("🎉 Payment successful!");
        loadCourses();
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();

  } catch (err) {
    console.error("❌ Payment error:", err);
    alert("Payment failed");
  }
}

/* ================= GO TO WEEK 1 ================= */
function goToWeek1() {
  window.location.href = "../courses/frontend-courses/week1.html";
}

/* ================= MODAL ================= */
function openEnrollModal(courseId, courseTitle) {
  const modal = document.getElementById("enrollModal");
  if (!modal) return;

  document.getElementById("courseId").value = courseId;
  document.getElementById("courseTitle").value = courseTitle;

  modal.classList.add("active");
}

function closeEnrollModal() {
  const modal = document.getElementById("enrollModal");
  if (!modal) return;

  modal.classList.remove("active");
}

window.closeEnrollModal = closeEnrollModal;

/* ================= ENROLL FORM ================= */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("enrollForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login first");
      window.location.href = "../auth/login.html";
      return;
    }

    const courseId = document.getElementById("courseId").value;
    const name = document.getElementById("enrollName").value.trim();
    const email = document.getElementById("enrollEmail").value.trim();
    const phone = document.getElementById("enrollPhone").value.trim();

    if (!name || !email || !phone) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/enroll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          courseId,
          courseTitle: document.getElementById("courseTitle").value
        })
      });

      const data = await res.json();

      // ✅ SUCCESS
      if (res.status === 201) {
        alert("🎉 Enrollment successful");
        closeEnrollModal();
        startPayment(courseId); // 🔥 DIRECT PAYMENT
        return;
      }

      // 🔥 ALREADY ENROLLED
      if (res.status === 409) {
        alert("Already enrolled → proceed to payment");
        closeEnrollModal();
        startPayment(courseId); // 🔥 ALSO OPEN PAYMENT
        return;
      }

      alert(data.message || "Enrollment failed");

    } catch (err) {
      console.error("❌ Enroll error:", err);
      alert("Server error");
    }
  });
});

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", loadCourses);