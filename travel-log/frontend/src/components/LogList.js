import axios from "axios";
import React from "react";

const LogList = ({ logs, refreshLogs, setCurrentLog }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/logs/${id}`);
      refreshLogs();
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  };

  return (
    <div className="log-list">
      <h2>Travel Logs</h2>
      {logs.map((log) => (
        <div key={log._id} className="log-item">
          <h3>{log.title}</h3>
          <p>{log.location}</p>
          <p>{log.description}</p>
          <p>Rating: {log.rating}/5</p>
          <button className="edit-btn" onClick={() => setCurrentLog(log)}>Edit</button>
          <button onClick={() => handleDelete(log._id)} className="delete-btn">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default LogList;