import express from "express";
import { createTreatment, getTodayTreatments, updateTreatment } from "../controllers/treatment.controller";

const TreatmentRouter = express.Router();

TreatmentRouter.post("/appointments/:appointmentId/treatment", createTreatment);

TreatmentRouter.patch("/treatment/:treatmentId", updateTreatment);

TreatmentRouter.get("/doctor/treatments/today", getTodayTreatments);

export default TreatmentRouter;