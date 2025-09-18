import { useState, useEffect } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom' // to reflect URL
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


interface Application {
  company: string
  role: string
  status: 'Rejected' | 'Applied' | 'Interviewed' | string
  date: string
  duties: string
  requirements: string
}

export default function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([])
  const [formData, setFormData] = useState<Application>({
    company: '',
    role: '',
    status: '',
    date: '',
    duties: '',
    requirements: ''
  })

  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [filterStatus, setFilterStatus] = useState(searchParams.get('status') || '')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(searchParams.get('sort') === 'desc' ? 'desc' : 'asc')

  // Update URL whenever search/filter/sort changes
  useEffect(() => {
    const params: any = {}
    if (searchQuery) params.search = searchQuery
    if (filterStatus) params.status = filterStatus
    if (sortOrder) params.sort = sortOrder
    setSearchParams(params)
  }, [searchQuery, filterStatus, sortOrder, setSearchParams])

  // Form handlers
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddApplication = (e: FormEvent<HTMLFormElement>) => {
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

  const handleDelete = (index: number) => {
    setApplications(applications.filter((_, i) => i !== index))
  }

  // Filtered & searched applications
  const filteredApps = applications
    .filter(app => {
      const searchLower = searchQuery.toLowerCase()
      return (
        (!searchQuery || app.company.toLowerCase().includes(searchLower) || app.role.toLowerCase().includes(searchLower)) &&
        (!filterStatus || app.status === filterStatus)
      )
    })
    .sort((a, b) => {
      if (!a.date || !b.date) return 0
      return sortOrder === 'asc'
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  // Status color function
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Rejected':
        return '#e74c3c'
      case 'Applied':
        return '#f1c40f'
      case 'Interviewed':
        return '#2ecc71'
      default:
        return '#bdc3c7'
    }
  }

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-content">
        {/* Left column: Form + Search + Filter + Sort */}
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
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="">Select Status</option>
                <option value="Rejected">Rejected</option>
                <option value="Applied">Applied</option>
                <option value="Interviewed">Interviewed</option>
              </select>
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

          {/* Search, Filter, Sort */}
          <div className="dashboard-controls">
            <h3>Search / Filter / Sort</h3>
            <input
              type="text"
              placeholder="Search by company or role"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />

            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Interviewed">Interviewed</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select value={sortOrder} onChange={e => setSortOrder(e.target.value as 'asc' | 'desc')}>
              <option value="asc">Sort by Date Ascending</option>
              <option value="desc">Sort by Date Descending</option>
            </select>
          </div>
        </div>

        {/* Right column: Cards */}
        <div className="cards-container">
          {filteredApps.map((app, index) => (
            <div key={index} className="application-card">
              <h3>{app.company}</h3>
              <p><strong>Role:</strong> {app.role}</p>
              <p style={{ color: getStatusColor(app.status), fontWeight: 'bold' }}>{app.status}</p>
              <p><strong>Date:</strong> {app.date}</p>
              <p><strong>Duties:</strong> {app.duties}</p>
              <p><strong>Requirements:</strong> {app.requirements}</p>
              <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
