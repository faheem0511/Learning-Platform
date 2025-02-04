import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000"; // Update if backend is deployed

const Lesson = () => {
  const [token] = useState(localStorage.getItem("token") || "");
  const [lessons, setLessons] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLessons = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${API_URL}/lessons`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLessons(response.data.lessons);
    } catch (err) {
      setError("Failed to load lessons. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons(); // Auto-fetch lessons when the component loads
  }, []);

  return (
    <div>
      <h2>AI-Generated Lessons</h2>
      {loading && <p>Loading lessons...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {lessons ? (
        <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
          {lessons}
        </pre>
      ) : (
        <p>No lessons available.</p>
      )}
      <button onClick={fetchLessons}>Refresh Lessons</button>
    </div>
  );
};

export default Lesson;
