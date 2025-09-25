import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";

interface Application {
  id: number;
  company: string;
  role: string;
  status: "Rejected" | "Applied" | "Interviewed" | string;
  date: string;
  duties: string;
  requirements: string;
  address: string;
  contact: string;
  extraInfo: string;
}

const JobPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<Application | null>(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!jobId || !userId) return;

    fetch(`http://localhost:5000/users/${userId}`)
      .then((res) => res.json())
      .then((user) => {
        const job = (user.applications || []).find(
          (app: Application) => app.id === Number(jobId)
        );
        setJob(job || null);
      })
      .catch((err) => console.error("Error fetching job:", err));
  }, [jobId, userId]);

  if (!job)
    return (
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Loading job details...
      </p>
    );

  // Split duties and requirements by comma or newline to show as list
  const dutiesList = job.duties.split(/\r?\n|,/).map((duty) => duty.trim()).filter(Boolean);
  const requirementsList = job.requirements.split(/\r?\n|,/).map((req) => req.trim()).filter(Boolean);

  return (
    <div>
      <Navbar />
      <BackButton />
      <div
        className="job-container"
        style={{
          maxWidth: "800px",
          margin: "20px auto",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          background: "#f9f9f9",
        }}
      >
        <h1 style={{ color: "#2e7d32", marginBottom: "10px" }}>{job.role}</h1>
        <h2>{job.company}</h2>
        <p>
          <strong>Status:</strong> {job.status}
        </p>
        <p>
          <strong>Date Applied:</strong> {job.date}
        </p>
        <p>
          <strong>Address:</strong> {job.address}
        </p>
        <p>
          <strong>Contact:</strong> {job.contact}
        </p>

        <h3>Duties</h3>
        <ul>
          {dutiesList.map((duty, index) => (
            <li key={index}>{duty}</li>
          ))}
        </ul>

        <h3>Requirements</h3>
        <ul>
          {requirementsList.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>

        {job.extraInfo && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              background: "#e8f5e9",
              borderRadius: "5px",
            }}
          >
            <strong>Additional Information:</strong>
            <p>{job.extraInfo}</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default JobPage;
