import "dotenv/config";
import express from "express";
import cors from "cors";
import "./db/conn.js";
import patientRouter from "./routes/patientRoutes.js";

const app = express();

const PORT = process.env.PORT || 3000;

// middleware for allow json
app.use(express.json());

// middleware for cors
app.use(cors());

// routes
app.use("/api/patient", patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
