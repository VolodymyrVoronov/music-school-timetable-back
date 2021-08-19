import express from "express";

import { addNewTimetable, getTimetable, updateTimetable, getTeachersTimetable } from "./../controllers/timetable.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, addNewTimetable);
router.get("/getTimetable", auth, getTimetable);
router.patch("/:id", auth, updateTimetable);
router.post("/getTeachersTimetable", getTeachersTimetable);

export default router;
