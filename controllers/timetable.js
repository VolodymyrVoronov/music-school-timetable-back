import mongoose from "mongoose";

import Timetable from "../models/timetable.js";

import { NETWORK_STATUS } from "./../const/const.js";

export const addNewTimetable = async (req, res) => {
  const timetable = req.body;

  const newTimetable = new Timetable({ ...timetable, teacher: req.userId });

  try {
    await newTimetable.save();

    res.status(NETWORK_STATUS.OK).json(newTimetable);
  } catch (error) {
    res.status(NETWORK_STATUS.NOT_FOUND).json({ message: error.message });
  }
};

export const updateTimetable = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const timetable = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(NETWORK_STATUS.NOT_FOUND).send(`No Timetable with that id`);
    }

    const updatedTimetable = await Timetable.findByIdAndUpdate(_id, timetable, {
      new: true,
    });

    res.json(updatedTimetable);
  } catch (error) {
    res.status(NETWORK_STATUS.NOT_FOUND).json({ message: error.message });
  }
};

export const getTimetable = async (req, res) => {
  const teacherId = req.userId;

  try {
    const timetables = await Timetable.find();

    const filteredTimetable = timetables.filter((timetable) => timetable.teacher === teacherId);
    res.status(NETWORK_STATUS.OK).json(filteredTimetable);
  } catch (error) {
    res.status(NETWORK_STATUS.NOT_FOUND).json({ message: error.message });
  }
};

export const getTeachersTimetable = async (req, res) => {
  const { teacherId, date } = req.body;

  try {
    const timetables = await Timetable.find();

    const filteredTimetable = timetables
      .filter((timetable) => timetable.teacher === teacherId)
      .filter((timetable) => timetable.date === date);

    res.status(NETWORK_STATUS.OK).json(filteredTimetable);
  } catch (error) {
    res.status(NETWORK_STATUS.NOT_FOUND).json({ message: error.message });
  }
};
