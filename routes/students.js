import express from "express";

import { addNewStudent, getTeachersStudents, deleteStudent } from "./../controllers/students.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, addNewStudent);
router.get("/getStudents", auth, getTeachersStudents);
router.delete("/:id", auth, deleteStudent);

export default router;
