import express from "express";

import { addNewStudent, getTeachersStudents } from "./../controllers/students.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, addNewStudent);
router.get("/getStudents", auth, getTeachersStudents);

export default router;
