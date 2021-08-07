import mongoose from "mongoose";

import Student from "./../models/student.js";

export const addNewStudent = async (req, res) => {
  const student = req.body;

  const newStudent = new Student({ ...student, teacher: req.userId });

  try {
    await newStudent.save();

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getTeachersStudents = async (req, res) => {
  const teachertId = req.userId;

  try {
    const students = await Student.find();
    const filteredStudents = students.filter((student) => String(student.teacher) === String(teachertId));

    res.status(200).json(filteredStudents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send(`No student with that id`);
    }

    await Student.findByIdAndRemove(_id);

    res.json({ message: `Student deleted successfully` });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const student = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send(`No Student with that id`);
    }

    const updatedStudent = await Student.findByIdAndUpdate(_id, student, {
      new: true,
    });

    res.json(updatedStudent);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
