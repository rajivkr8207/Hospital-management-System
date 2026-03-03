import express from "express";

import IdentifyUser from "../middleware/auth.middleware.js";
import isDoctor from "../middleware/isDoctor.middleware.js";
import { registerDoctorFromInvite, updateConsultationFee,  updateDoctorProfile } from "../controllers/doctor.controller.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() })

const Doctorrouter = express.Router();


Doctorrouter.post("/register", upload.single('imageurl'), IdentifyUser, isDoctor, registerDoctorFromInvite);
Doctorrouter.patch("/update/fee/:id", IdentifyUser, isDoctor, updateConsultationFee);
Doctorrouter.put("/update/profile/:id", IdentifyUser, isDoctor, updateDoctorProfile);
// Doctorrouter.patch("/:id", IdentifyUser, isDoctor, updateConsultationFee);


export default Doctorrouter;