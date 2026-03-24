import os

BASE_DIR = "project-root"

FOLDERS = [
    # Frontend
    "frontend/public/images",
    "frontend/assets/css",
    "frontend/assets/fonts",
    "frontend/components",
    "frontend/pages/auth",
    "frontend/pages/user",
    "frontend/pages/admin",
    "frontend/pages/courses",
    "frontend/js/core",
    "frontend/js/user",
    "frontend/js/admin",
    "frontend/js/payment",

    # Backend
    "backend/src/config",
    "backend/src/models",
    "backend/src/controllers",
    "backend/src/routes",
    "backend/src/middleware",
    "backend/src/services",
    "backend/src/utils",

    # Certificates & uploads
    "certificates/templates",
    "certificates/generated",
    "uploads/images",
    "uploads/certificates"
]

FILES = [
    # Frontend root
    "frontend/index.html",

    # CSS
    "frontend/assets/css/base.css",
    "frontend/assets/css/auth.css",
    "frontend/assets/css/dashboard.css",
    "frontend/assets/css/admin.css",
    "frontend/assets/css/certificate.css",

    # Components
    "frontend/components/navbar.html",
    "frontend/components/footer.html",
    "frontend/components/loader.html",
    "frontend/components/modal.html",

    # Auth pages
    "frontend/pages/auth/login.html",
    "frontend/pages/auth/register.html",

    # User pages
    "frontend/pages/user/dashboard.html",
    "frontend/pages/user/profile.html",
    "frontend/pages/user/my-courses.html",
    "frontend/pages/user/quiz.html",
    "frontend/pages/user/certificates.html",

    # Admin pages
    "frontend/pages/admin/dashboard.html",
    "frontend/pages/admin/users.html",
    "frontend/pages/admin/courses.html",
    "frontend/pages/admin/enrollments.html",
    "frontend/pages/admin/payments.html",
    "frontend/pages/admin/quizzes.html",
    "frontend/pages/admin/certificates.html",

    # Course pages
    "frontend/pages/courses/all-courses.html",
    "frontend/pages/courses/course-details.html",

    # Frontend JS core
    "frontend/js/core/api.js",
    "frontend/js/core/auth.js",
    "frontend/js/core/storage.js",
    "frontend/js/core/guards.js",

    # Frontend JS user
    "frontend/js/user/dashboard.js",
    "frontend/js/user/courses.js",
    "frontend/js/user/quiz.js",
    "frontend/js/user/certificates.js",

    # Frontend JS admin
    "frontend/js/admin/dashboard.js",
    "frontend/js/admin/users.js",
    "frontend/js/admin/courses.js",
    "frontend/js/admin/payments.js",
    "frontend/js/admin/certificates.js",

    # Razorpay
    "frontend/js/payment/razorpay.js",

    # Backend entry
    "backend/server.js",
    "backend/src/app.js",

    # Backend config
    "backend/src/config/db.js",
    "backend/src/config/razorpay.js",
    "backend/src/config/env.js",

    # Backend models
    "backend/src/models/User.js",
    "backend/src/models/Admin.js",
    "backend/src/models/Course.js",
    "backend/src/models/Enrollment.js",
    "backend/src/models/Quiz.js",
    "backend/src/models/QuizResult.js",
    "backend/src/models/Payment.js",
    "backend/src/models/Certificate.js",

    # Backend controllers
    "backend/src/controllers/auth.controller.js",
    "backend/src/controllers/admin.controller.js",
    "backend/src/controllers/course.controller.js",
    "backend/src/controllers/enrollment.controller.js",
    "backend/src/controllers/quiz.controller.js",
    "backend/src/controllers/payment.controller.js",
    "backend/src/controllers/certificate.controller.js",

    # Backend routes
    "backend/src/routes/auth.routes.js",
    "backend/src/routes/admin.routes.js",
    "backend/src/routes/course.routes.js",
    "backend/src/routes/enrollment.routes.js",
    "backend/src/routes/quiz.routes.js",
    "backend/src/routes/payment.routes.js",
    "backend/src/routes/certificate.routes.js",

    # Backend middleware
    "backend/src/middleware/auth.middleware.js",
    "backend/src/middleware/admin.middleware.js",
    "backend/src/middleware/error.middleware.js",

    # Backend services
    "backend/src/services/auth.service.js",
    "backend/src/services/payment.service.js",
    "backend/src/services/certificate.service.js",
    "backend/src/services/qr.service.js",

    # Backend utils
    "backend/src/utils/jwt.js",
    "backend/src/utils/password.js",
    "backend/src/utils/pdf.js",
    "backend/src/utils/logger.js",

    # Root files
    ".env",
    "package.json",
    "nodemon.json",
    "README.md"
]

def create_structure():
    os.makedirs(BASE_DIR, exist_ok=True)

    for folder in FOLDERS:
        os.makedirs(os.path.join(BASE_DIR, folder), exist_ok=True)

    for file in FILES:
        path = os.path.join(BASE_DIR, file)
        if not os.path.exists(path):
            with open(path, "w", encoding="utf-8") as f:
                f.write(f"// {file}\n")

    print("✅ Professional certification platform structure created successfully.")

if __name__ == "__main__":
    create_structure()
