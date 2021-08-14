import express from "express";

import { addNewTimetable, getTimetable } from "./../controllers/timetable.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, addNewTimetable);
router.get("/getTimetable", auth, getTimetable);

export default router;
