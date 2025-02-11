import Schedule from "../models/Schedule.js";

// Get schedule for a class
export const getSchedule = async (req, res) => {
  const { className } = req.params;
  try {
    const schedule = await Schedule.findOne({ className });
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update or Create schedule for a class
export const updateSchedule = async (req, res) => {
  const { className } = req.params; // ✅ Get className from URL params
  const { schedule } = req.body;

  try {
    let existingSchedule = await Schedule.findOne({ className });

    if (existingSchedule) {
      existingSchedule.schedule = schedule;
      await existingSchedule.save();
      return res.status(200).json({ message: "Schedule updated successfully" });
    } else {
      // ✅ Fix: Create a new schedule if it doesn’t exist
      const newSchedule = new Schedule({ className, schedule });
      await newSchedule.save();
      return res.status(201).json({ message: "New schedule created successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
