require("dotenv").config();
const express = require("express");
const { DbConnect } = require("./config/db");
const app = express();
const port = 3000;
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");

DbConnect();

app.use(
  cors({
    origin: "https://task-manager-client-j6rm.onrender.com",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", userRoutes);
app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
