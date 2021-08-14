import mongoose from "mongoose";

import Timetable from "../models/timetable.js";

export const addNewTimetable = async (req, res) => {
  const timetable = req.body;

  console.log(timetable);

  const newTimetable = new Timetable({ ...timetable, teacher: req.userId });

  try {
    await newTimetable.save();

    res.status(200).json(newTimetable);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTimetable = async (req, res) => {
  const teacherId = req.userId;

  try {
    const timetables = await Timetable.find();

    const filteredTimetable = timetables.filter((timetable) => (timetable.teacher = teacherId));

    res.status(200).json(filteredTimetable);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
