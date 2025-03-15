import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LogDetail from "./components/LogDetail";
import LogForm from "./components/LogForm";
import LogList from "./components/LogList";
import "./styles/styles.css";

const App = () => {
  const [logs, setLogs] = useState([]);
  const [currentLog, setCurrentLog] = useState(null);

  const fetchLogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/logs");
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <Router>
      <div className="app">
        <h1>🌍 Travel Log App</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <LogForm refreshLogs={fetchLogs} currentLog={currentLog} setCurrentLog={setCurrentLog} />
                <LogList logs={logs} refreshLogs={fetchLogs} setCurrentLog={setCurrentLog} />
              </>
            }
          />
          <Route path="/log/:id" element={<LogDetail refreshLogs={fetchLogs} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
