import React from "react";
import { Bar } from "react-chartjs-2"; // Ensure this is imported
import "chart.js/auto"; // Ensure you have this import for Chart.js
import "./ProfileAnalysis.css";


const ProfileAnalysis = ({ data }) => {
  const { platform, userId, solvedProblems, stars, ranking, activity } = data;

  // Prepare data for the bar chart
  const barChartData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        label: "Problems Solved",
        data: [solvedProblems.easy, solvedProblems.medium, solvedProblems.hard],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
        borderRadius: 5,
        borderWidth: 1,
      },
    ],
  };

  // Ensure activity is an array before calling map
  const activityList = Array.isArray(activity) ? activity : [];

  return (
    <div className="profile-analysis">
      <h2 className="title">
        Profile Analysis for <span>{userId}</span> on {platform.toUpperCase()}
      </h2>
      <div className="profile-container">
        {/* Profile Statistics */}
        <div className="profile-card">
          <h3>Profile Stats</h3>
          <p>
            <strong>Stars:</strong> {stars} ⭐
          </p>
          <p>
            <strong>Ranking:</strong> {ranking}
          </p>
        </div>

        {/* Chart */}
        <div className="chart-card">
          <h3>Problems Solved</h3>
          <Bar data={barChartData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Activity Log */}
      <div className="activity-log">
        <h3>Activity Log</h3>
        <ul>
          {activityList.length > 0 ? (
            activityList.map((entry, index) => (
              <li key={index}>
                <strong>{entry.date}:</strong> Solved {entry.problemsSolved}{" "}
                problems
              </li>
            ))
          ) : (
            <p>No activity recorded yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProfileAnalysis;  // Ensure you are exporting it as default
