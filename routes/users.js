import express from "express";

import { login, registration, getTeachers } from "./../controllers/users.js";

const router = express.Router();

router.post("/login", login);
router.post("/registration", registration);
router.get("/", getTeachers);

export default router;
