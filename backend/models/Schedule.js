import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  className: { type: String, required: true },
  schedule: [
    {
      day: { type: String, required: true },
      subject: { type: String, required: true },
      teacher: { type: String, required: true },
    },
  ],
});

const Schedule = mongoose.model("Schedule", scheduleSchema);
export default Schedule;
