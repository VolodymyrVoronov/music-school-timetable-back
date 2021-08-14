import express from "express";

import { addNewTimetable } from "./../controllers/timetable.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, addNewTimetable);

export default router;
