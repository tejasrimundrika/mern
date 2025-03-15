import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/styles.css";

const LogForm = ({ refreshLogs, currentLog, setCurrentLog }) => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    rating: 1,
  });

  useEffect(() => {
    if (currentLog) setFormData(currentLog);
  }, [currentLog]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentLog) {
        await axios.put(`http://localhost:5000/api/logs/${currentLog._id}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/logs", formData);
      }
      setFormData({ title: "", location: "", description: "", rating: 1 });
      setCurrentLog(null);
      refreshLogs();
    } catch (error) {
      console.error("Error saving log:", error);
    }
  };

  return (
    <form className="log-form" onSubmit={handleSubmit}>
      <h2>{currentLog ? "Edit Log" : "Add a Travel Log"}</h2>
      <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required></textarea>
      <input type="number" name="rating" min="1" max="5" value={formData.rating} onChange={handleChange} required />
      <button type="submit">{currentLog ? "Update Log" : "Add Log"}</button>
    </form>
  );
};

export default LogForm;