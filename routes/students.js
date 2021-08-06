import express from "express";

import { addNewStudent } from "./../controllers/students.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, addNewStudent);

export default router;
