const express = require("express");
require("dotenv").config({ path: "./config.env" });
const authRoutes = require("./routes/auth-route.js");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`server is listening on http://localhost:${PORT}`)
);
