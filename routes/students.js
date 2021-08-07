import express from "express";

import { addNewStudent, getTeachersStudents, deleteStudent, updateStudent } from "./../controllers/students.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, addNewStudent);
router.get("/getStudents", auth, getTeachersStudents);
router.delete("/:id", auth, deleteStudent);
router.patch("/:id", auth, updateStudent);

export default router;
