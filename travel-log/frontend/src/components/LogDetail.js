import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/styles.css";

const LogDetail = () => {
  const { id } = useParams(); // Get log ID from URL
  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/logs/${id}`);
        console.log("Fetched Log Data:", response.data); // Debugging
        setLog(response.data);
      } catch (error) {
        console.error("Error fetching log:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLog();
  }, [id]);

  if (loading) return <h2>Loading...</h2>; // Show loading only while fetching

  if (!log) return <h2>Error: Log not found</h2>; // Show error if log is not found

  return (
    <div className="log-detail">
      <h2>{log.title}</h2>
      <p><strong>Location:</strong> {log.location}</p>
      <p><strong>Description:</strong> {log.description}</p>
      <p><strong>Rating:</strong> {log.rating}/5</p>
    </div>
  );
};

export default LogDetail;
