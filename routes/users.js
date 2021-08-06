import express from "express";

import { login, registration } from "./../controllers/users.js";

const router = express.Router();

router.post("/login", login);
router.post("/registration", registration);

export default router;
