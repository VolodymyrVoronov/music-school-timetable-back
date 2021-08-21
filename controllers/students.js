import mongoose from "mongoose";

import Student from "./../models/student.js";

import { NETWORK_STATUS } from "./../const/const.js";

export const addNewStudent = async (req, res) => {
  const student = req.body;

  const newStudent = new Student({ ...student, teacher: req.userId });

  try {
    await newStudent.save();

    res.status(NETWORK_STATUS.CREATED).json(newStudent);
  } catch (error) {
    res.status(NETWORK_STATUS.CONFLICT).json({ message: error.message });
  }
};

export const getTeachersStudents = async (req, res) => {
  const teachertId = req.userId;

  try {
    const students = await Student.find();
    const filteredStudents = students
      .filter((student) => String(student.teacher) === String(teachertId))
      .sort((a, b) => a.firstName.localeCompare(b.firstName));

    res.status(NETWORK_STATUS.OK).json(filteredStudents);
  } catch (error) {
    res.status(NETWORK_STATUS.NOT_FOUND).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(NETWORK_STATUS.NOT_FOUND).send(`No student with that id`);
    }

    await Student.findByIdAndRemove(_id);

    res.json({ message: `Student deleted successfully` });
  } catch (error) {
    res.status(NETWORK_STATUS.NOT_FOUND).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const student = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(NETWORK_STATUS.NOT_FOUND).send(`No Student with that id`);
    }

    const updatedStudent = await Student.findByIdAndUpdate(_id, student, {
      new: true,
    });

    res.json(updatedStudent);
  } catch (error) {
    res.status(NETWORK_STATUS.NOT_FOUND).json({ message: error.message });
  }
};
