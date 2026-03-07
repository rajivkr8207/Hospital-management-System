import express from "express";
import {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
} from "../controllers/department.controller.js";
import IdentifyUser from "../middleware/auth.middleware.js";
import isAdmin from "../middleware/isAdmin.middleware.js";


const Departmentrouter = express.Router();


Departmentrouter.post("/", IdentifyUser, isAdmin, createDepartment);
Departmentrouter.get("/", IdentifyUser, getAllDepartments);
Departmentrouter.get("/:id", IdentifyUser, getDepartmentById);
Departmentrouter.put("/:id", IdentifyUser, isAdmin, updateDepartment);
Departmentrouter.delete("/:id", IdentifyUser, isAdmin, deleteDepartment);

export default Departmentrouter;