import mongoose from "mongoose";

import Timetable from "../models/timetable.js";

export const addNewTimetable = async (req, res) => {
  const timetable = req.body;

  const newTimetable = new Timetable({ ...timetable, teacher: req.userId });

  try {
    await newTimetable.save();

    res.status(200).json(newTimetable);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateTimetable = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const timetable = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send(`No Timetable with that id`);
    }

    const updatedTimetable = await Timetable.findByIdAndUpdate(_id, timetable, {
      new: true,
    });

    res.json(updatedTimetable);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTimetable = async (req, res) => {
  const teacherId = req.userId;

  try {
    const timetables = await Timetable.find();

    const filteredTimetable = timetables.filter((timetable) => timetable.teacher === teacherId);
    res.status(200).json(filteredTimetable);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTeachersTimetable = async (req, res) => {
  const { teacherId, date } = req.body;

  try {
    const timetables = await Timetable.find();

    const filteredTimetable = timetables
      .filter((timetable) => timetable.teacher === teacherId)
      .filter((timetable) => timetable.date === date);

    res.status(200).json(filteredTimetable);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
