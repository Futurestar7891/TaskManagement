const express = require("express");
const cookieParser = require("cookie-parser");
const connection = require("./Rotutesanddatabase/database");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./User/createloginuser");
const taskRoutes = require("./Rotutesanddatabase/taskroutes");

const app = express();
dotenv.config();

// Error handling for synchronous initialization errors
connection();

app.use(express.json());
app.use(cookieParser());
// Update CORS configuration to allow credentials
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use("/api", userRoutes);
app.use("/api", taskRoutes);

const PORT = process.env.PORT || 3000; // Provide a default port if not set in environment
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
console.log(PORT, "ye dekh bhadwe");
