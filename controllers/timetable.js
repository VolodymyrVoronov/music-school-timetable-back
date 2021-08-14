import mongoose from "mongoose";

import Timetable from "../models/timetable.js";

export const addNewTimetable = async (req, res) => {
  const timetable = req.body;

  console.log(timetable);

  const newTimetable = new Timetable({ ...timetable, teacher: req.userId });

  try {
    await newTimetable.save();

    res.status(201).json(newTimetable);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
