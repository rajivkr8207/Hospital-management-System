import express from "express";

import IdentifyUser from "../middleware/auth.middleware.js";
import isAdmin from "../middleware/isAdmin.middleware.js";
import { inviteDoctor } from "../controllers/admin.controller.js";


const Adminrouter = express.Router();


Adminrouter.post("/", IdentifyUser, isAdmin, inviteDoctor);

export default Adminrouter;