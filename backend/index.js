const express = require("express");
const connection = require("./Rotutesanddatabase/database");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const userRoutes = require("./User/createloginuser");
const taskRoutes = require("./Rotutesanddatabase/taskroutes");

connection();

dotenv.config({ path: "backend/config.env" });
app.use(express.json()); // Apply the body-parser middleware for parsing JSON bodies

app.use(cors());

app.use("/api", userRoutes);
app.use("/api", taskRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`the server is listening on the port ${PORT}`);
});
