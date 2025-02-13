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

// Create a new schedule
export const createSchedule = async (req, res) => {
  const { className, schedule } = req.body;
  try {
    let existingSchedule = await Schedule.findOne({ className });
    
    if (existingSchedule) {
      return res.status(400).json({ message: "Schedule already exists. Use PUT to update." });
    }

    const newSchedule = new Schedule({ className, schedule });
    await newSchedule.save();

    res.status(201).json({ message: "Schedule created successfully", newSchedule });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing schedule
export const updateSchedule = async (req, res) => {
  const { className } = req.params;
  const { schedule } = req.body;

  try {
    let existingSchedule = await Schedule.findOne({ className });

    if (!existingSchedule) {
      return res.status(404).json({ message: "Schedule not found. Use POST to create a new schedule." });
    }

    existingSchedule.schedule = schedule;
    await existingSchedule.save();

    res.status(200).json({ message: "Schedule updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
