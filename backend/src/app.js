const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const courseRoutes = require("./routes/course.routes");
const enrollmentRoutes = require("./routes/enrollment.routes");
const adminRoutes = require("./routes/admin.routes");
const app = express();

/* ================= CORS FIX ================= */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());

/* ================= MIDDLEWARE ================= */
app.use(express.json());
// =================admin routes===============//
app.use("/api/admin", adminRoutes);
/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enroll", enrollmentRoutes);

/* ================= HEALTH ================= */
app.get("/", (req, res) => {
  res.json({ status: "SkilllCertify API running" });
});

module.exports = app;