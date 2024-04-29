import "dotenv/config";
import express from "express";
import cors from "cors";
import "./db/conn.js";
import patientRouter from "./routes/patientRoutes.js";
import buffetRouter from "./routes/buffetRoutes.js";

const app = express();

const PORT = process.env.PORT || 3000;

// middleware for allow json
app.use(express.json());

// middleware for cors
app.use(cors());

// patient routes
app.use("/api/patient", patientRouter);

// buffet routes
app.use("/api/buffet", buffetRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
