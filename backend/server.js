require("dotenv").config();
const app = require("./src/app");   // or your correct path
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch(err => console.log(err));
