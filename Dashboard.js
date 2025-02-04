import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [subjects, setSubjects] = useState([]);
  const [lesson, setLesson] = useState("");

  const handlePreferences = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/preferences",
        { subjects: ["Math", "Science"], difficulty: "Intermediate" },
        { headers: { Authorization: token } }
      );
      alert("Preferences saved!");
    } catch (error) {
      console.error("Error saving preferences:", error.message);
    }
  };

  const fetchLesson = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/lessons", {
        headers: { Authorization: token },
      });
      setLesson(response.data.lesson);
    } catch (error) {
      console.error("Error fetching lesson:", error.message);
    }
  };

  return (
    <div>
      <h2>Welcome to Your Learning Dashboard</h2>
      <button onClick={handlePreferences}>Save Learning Preferences</button>
      <button onClick={fetchLesson}>Get AI-Generated Lesson</button>
      {lesson && <div><h3>Lesson:</h3><p>{lesson}</p></div>}
    </div>
  );
};

export default Dashboard;
