import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';

interface JobDetails {
  id: number;
  title: string;
  company: string;
  address: string;
  contact: string;
  duties: string[];
  requirements: string[];
  extraInfo?: string;
}

const JobPage: React.FC = () => {
  const [job, setJob] = useState<JobDetails | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/jobs/1') // Fetch the first job
      .then(response => response.json())
      .then(data => setJob(data))
      .catch(error => console.error("Error fetching job:", error));
  }, []);

  if (!job) {
    return <p style={{ textAlign: "center", marginTop: "20px" }}>Loading job details...</p>;
  }

  return (
    <div>
      <Navbar />
      <BackButton/>
      <div className="job-container" style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', background: '#f9f9f9' }}>
        <h1 style={{ color: '#2e7d32', marginBottom: '10px' }}>{job.title}</h1>
        <h2 style={{ marginBottom: '5px' }}>{job.company}</h2>
        <p><strong>Address:</strong> {job.address}</p>
        <p><strong>Contact:</strong> {job.contact}</p>

        <h3 style={{ marginTop: '20px' }}>Duties</h3>
        <ul>
          {job.duties.map((duty, index) => (
            <li key={index}>{duty}</li>
          ))}
        </ul>

        <h3>Requirements</h3>
        <ul>
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>

        {job.extraInfo && (
          <div style={{ marginTop: '20px', padding: '10px', background: '#e8f5e9', borderRadius: '5px' }}>
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
