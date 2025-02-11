import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ScheduleDisplay = () => {
  const { className } = useParams();
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Fetch existing schedule from backend
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/schedule/${className}`);

        // Ensure `schedule` exists, otherwise use an empty array
        const fetchedSchedule = data.schedule || [];

        // Fill missing days with default values
        const updatedSchedule = days.map((day) => {
          const existingDay = fetchedSchedule.find((item) => item.day === day);
          return existingDay || { day, subject: "Not Assigned", teacher: "Not Assigned" };
        });

        setSchedule(updatedSchedule);
      } catch (err) {
        setError("Error fetching schedule");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [className]);

  // Handle input change safely
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

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center mb-4">Schedule for {className}</h1>

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

        {/* Toggle Edit Mode */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="w-full bg-blue-500 text-white p-2 mt-4 rounded"
        >
          {isEditing ? "Cancel Edit" : "Update Schedule"}
        </button>

        {/* Save Changes Button (Only visible in edit mode) */}
        {isEditing && (
          <button
            onClick={handleSaveChanges}
            className="w-full bg-green-500 text-white p-2 mt-2 rounded"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default ScheduleDisplay;
