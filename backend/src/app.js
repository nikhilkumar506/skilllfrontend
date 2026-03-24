const express = require("express");
const cors = require("cors");

// ✅ FIXED PATHS
const authRoutes = require("./src/routes/auth.routes");
const courseRoutes = require("./src/routes/course.routes");
const enrollmentRoutes = require("./src/routes/enrollment.routes");
const adminRoutes = require("./src/routes/admin.routes");
const paymentRoutes = require("./src/routes/payment.routes");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enroll", enrollmentRoutes);
app.use("/api/payment", paymentRoutes);

// TEST
app.get("/", (req, res) => {
  res.json({ status: "SkilllCertify API running" });
});

module.exports = app;