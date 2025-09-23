import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BackButton from '../components/BackButton'

interface Application {
 company: string
 role: string
 status: 'Rejected' | 'Applied' | 'Interviewed' | string
 date: string
 duties: string
 requirements: string
}

export default function Dashboard() {
 // States
 const [applications, setApplications] = useState<Application[]>([])
 const [formData, setFormData] = useState<Application>({
   company: '',
   role: '',
   status: '',
   date: '',
   duties: '',
   requirements: ''
 })
 const [editingIndex, setEditingIndex] = useState<number | null>(null)
 const [editingData, setEditingData] = useState<Application | null>(null)

 const [searchParams, setSearchParams] = useSearchParams()
 const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
 const [filterStatus, setFilterStatus] = useState(searchParams.get('status') || '')
 const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(searchParams.get('sort') === 'desc' ? 'desc' : 'asc')

 // Sync URL params
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
     setApplications([...applications, { ...formData }]) // Create a new object
     setFormData({      
      company: '',
     role: '',
      status: '',
      date: '',
       duties: '',
       requirements: ''
     })
   }  }

 const handleDelete = (index: number) => {
   setApplications(applications.filter((_, i) => i !== index))
 }

  // Edit handlers
  const handleEditClick = (index: number) => {
    setEditingIndex(index)
    setEditingData({ ...applications[index] })
  }

  const handleEditChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editingData) return
    setEditingData({ ...editingData, [e.target.name]: e.target.value })
  }

  const handleEditSave = () => {
    if (editingIndex !== null && editingData) {
      const updatedApps = [...applications]
      updatedApps[editingIndex] = editingData
      setApplications(updatedApps)
      setEditingIndex(null)
      setEditingData(null)
    }
  }

  const handleEditCancel = () => {
    setEditingIndex(null)
    setEditingData(null)
  }

  // Filter and sort
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Rejected': return '#e74c3c'
      case 'Applied': return '#f1c40f'
      case 'Interviewed': return '#2ecc71'
      default: return '#bdc3c7'
    }
  }

  return (
    <div >
      <Navbar />
      <BackButton/>
      
      <div className="dashboard-content">

        {/* Left column: Form + Controls */}
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

          <div className="dashboard-controls">
            <h3>Search / Filter / Sort</h3>
            <input type="text" placeholder="Search by company or role" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
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
              <button className="edit-btn" onClick={() => handleEditClick(index)}>Edit</button>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {editingData && (
        <div className="edit-modal" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', width: '300px' }}>
            <h3>Edit Application</h3>
            <label>Company:<input type="text" name="company" value={editingData.company} onChange={handleEditChange} /></label>
            <label>Role:<input type="text" name="role" value={editingData.role} onChange={handleEditChange} /></label>
            <label>Status:
              <select name="status" value={editingData.status} onChange={handleEditChange}>
                <option value="">Select Status</option>
                <option value="Rejected">Rejected</option>
                <option value="Applied">Applied</option>
                <option value="Interviewed">Interviewed</option>
              </select>
            </label>
            <label>Date:<input type="date" name="date" value={editingData.date} onChange={handleEditChange} /></label>
            <label>Duties:<input type="text" name="duties" value={editingData.duties} onChange={handleEditChange} /></label>
            <label>Requirements:<input type="text" name="requirements" value={editingData.requirements} onChange={handleEditChange} /></label>
            <div style={{ marginTop: '1rem' }}>
              <button onClick={handleEditSave} style={{ marginRight: '0.5rem' }}>Save</button>
              <button onClick={handleEditCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
