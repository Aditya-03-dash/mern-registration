require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const registrationRoutes = require("./routes/registrationRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.get("/", (req, res) => res.json({ success: true, message: "API is running" }));
app.use("/api/registrations", registrationRoutes);

app.use(notFound);
app.use(errorHandler);

connectDB().then(() => {
  app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
});
