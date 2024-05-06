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
app.use(cors());

app.use("/api", userRoutes);
app.use("/api", taskRoutes);

const PORT = process.env.PORT;
console.log(PORT, "ye dekh behncod");
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
console.log(PORT, "ye dekh bhadwe");
