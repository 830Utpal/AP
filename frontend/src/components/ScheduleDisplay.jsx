import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./schedule.css";
const ScheduleDisplay = () => {
  const { className } = useParams();
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Fetch existing schedule
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/schedule/${className}`);
        const fetchedSchedule = data.schedule || [];

        const updatedSchedule = days.map((day) => {
          const existingDay = fetchedSchedule.find((item) => item.day === day);
          return existingDay || { day, subject: "Not Assigned", teacher: "Not Assigned" };
        });

        setSchedule(updatedSchedule);
      } catch (err) {
        setError("No schedule found for this class.");
        setSchedule([]); // Ensure state is empty if no data
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [className]);

  // Handle input change
  const handleInputChange = (index, field, value) => {
    setSchedule((prevSchedule) =>
      prevSchedule.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  // Save updated schedule
  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:5000/api/schedule/${className}`, { schedule });
      alert("Schedule updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating schedule:", error.response?.data || error.message);
      alert("Failed to update schedule.");
    }
  };

  // Add a new schedule if none exists
  const handleAddSchedule = async () => {
    const defaultSchedule = days.map((day) => ({
      day,
      subject: "Not Assigned",
      teacher: "Not Assigned",
    }));

    try {
      await axios.post(`http://localhost:5000/api/schedule`, {
        className,
        schedule: defaultSchedule,
      });

      setSchedule(defaultSchedule);
      setError("");
      alert("Schedule added successfully!");
    } catch (error) {
      console.error("Error adding schedule:", error.response?.data || error.message);
      alert("Failed to add schedule.");
    }
  };

  if (loading) return <div className="text-center text-xl">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center mb-4">Schedule for {className}</h1>

        {schedule.length === 0 ? (
          <div className="text-center">
            <p className="text-red-500 mb-4">No schedule found for this class.</p>
            <button
              onClick={handleAddSchedule}
              className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600 transition"
            >
              Add Schedule
            </button>
          </div>
        ) : (
          <>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="border p-2">Day</th>
                  <th className="border p-2">Subject</th>
                  <th className="border p-2">Teacher</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((item, index) => (
                  <tr key={index} className="bg-gray-50">
                    <td className="border p-2 text-center">{item.day}</td>
                    <td className="border p-2 text-center">
                      {isEditing ? (
                        <input
                          type="text"
                          value={item.subject}
                          onChange={(e) => handleInputChange(index, "subject", e.target.value)}
                          className="border p-1 w-full"
                        />
                      ) : (
                        item.subject
                      )}
                    </td>
                    <td className="border p-2 text-center">
                      {isEditing ? (
                        <input
                          type="text"
                          value={item.teacher}
                          onChange={(e) => handleInputChange(index, "teacher", e.target.value)}
                          className="border p-1 w-full"
                        />
                      ) : (
                        item.teacher
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Edit Mode Toggle */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="w-full bg-blue-500 text-white p-2 mt-4 rounded shadow hover:bg-blue-600 transition"
            >
              {isEditing ? "Cancel Edit" : "Update Schedule"}
            </button>

            {/* Save Changes Button (Only in edit mode) */}
            {isEditing && (
              <button
                onClick={handleSaveChanges}
                className="w-full bg-green-500 text-white p-2 mt-2 rounded shadow hover:bg-green-600 transition"
              >
                Save Changes
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ScheduleDisplay;
