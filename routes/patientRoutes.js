import { Router } from "express";
import Patient from "../controllers/patientControllers.js";

const patientRouter = new Router();

//Public route
patientRouter.get("/", Patient.getAll);
patientRouter.post("/", Patient.add);
patientRouter.post("/bulk", Patient.addMany);
patientRouter.put("/:id", Patient.update);

export default patientRouter;
