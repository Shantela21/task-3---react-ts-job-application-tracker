import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './Dashboard.css'

export default function Dashboard() {
  const [applications, setApplications] = useState([])
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: '',
    date: '',
    duties: '',
    requirements: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddApplication = (e) => {
    e.preventDefault()
    if (formData.company && formData.role) {
      setApplications([...applications, formData])
      setFormData({
        company: '',
        role: '',
        status: '',
        date: '',
        duties: '',
        requirements: ''
      })
    }
  }

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-form">
        <form className="dashboardForm" onSubmit={handleAddApplication}>
          <h2 className="form-title">Job Application Dashboard</h2>
          
          <label>
            Company Name:
            <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Enter company name" />
          </label>

          <label>
            Role:
            <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Enter job role" />
          </label>

          <label>
            Status:
            <input type="text" name="status" value={formData.status} onChange={handleChange} placeholder="e.g. Pending, Accepted" />
          </label>

          <label>
            Date Applied:
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
          </label>

          <label>
            Duties:
            <input type="text" name="duties" value={formData.duties} onChange={handleChange} placeholder="Key responsibilities" />
          </label>

          <label>
            Requirements:
            <input type="text" name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Skills or experience" />
          </label>

          <button type="submit" className="submit-btn">Add Application</button>
        </form>
      </div>

      <div className="cards-container">
        {applications.map((app, index) => (
          <div key={index} className="application-card">
            <h3>{app.company}</h3>
            <p><strong>Role:</strong> {app.role}</p>
            <p><strong>Status:</strong> {app.status}</p>
            <p><strong>Date:</strong> {app.date}</p>
            <p><strong>Duties:</strong> {app.duties}</p>
            <p><strong>Requirements:</strong> {app.requirements}</p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  )
}
