import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  secondName: { type: String, required: true },
  studentClass: { type: String, required: true },
  teacher: String,
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
