import mongoose from "mongoose";

const timetableSchema = mongoose.Schema({
  cards: [
    {
      cardId: { type: String, default: "" },
      order: { type: Number, default: 0 },
      data: {
        lessonStart: { type: String, default: "" },
        lessonEnd: { type: String, default: "" },
        student: { type: String, default: "" },
      },
    },
  ],
  date: { type: String, default: "", required: true },
  teacher: String,
});

const Timetable = mongoose.model("Timetable", timetableSchema);

export default Timetable;
