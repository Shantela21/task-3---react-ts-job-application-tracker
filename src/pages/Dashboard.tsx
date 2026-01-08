import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";
import JobCard from "../components/JobCard";

interface Application {
  id: number; // Unique ID for each application
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

export default function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [formData, setFormData] = useState<Omit<Application, "id">>({
    company: "",
    role: "",
    status: "",
    date: "",
    duties: "",
    requirements: "",
    address: "",
    contact: "",
    extraInfo: "",
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<Application | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [filterStatus, setFilterStatus] = useState(
    searchParams.get("status") || ""
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
    searchParams.get("sort") === "desc" ? "desc" : "asc"
  );

  const userId = localStorage.getItem("userId");
  const API_URL = `http://localhost:5000/users/${userId}`;

  // Load user applications
  useEffect(() => {
    if (userId) {
      fetch(API_URL)
        .then((res) => res.json())
        .then((user) => setApplications(user.applications || []))
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, [userId]);

  // Sync URL params
  useEffect(() => {
    const params: Record<string, string> = {};
    if (searchQuery) params.search = searchQuery;
    if (filterStatus) params.status = filterStatus;
    if (sortOrder) params.sort = sortOrder;
    setSearchParams(params);
  }, [searchQuery, filterStatus, sortOrder, setSearchParams]);

  // Save applications to backend
  const saveApplications = async (apps: Application[]) => {
    if (!userId) return;
    await fetch(API_URL, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ applications: apps }),
    });
    setApplications(apps);
  };

  // Handle form inputs
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new application
  const handleAddApplication = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.company && formData.role) {
      const newApps = [
        ...applications,
        { ...formData, id: Date.now() }, // Use timestamp as unique ID
      ];
      await saveApplications(newApps);
      setFormData({
        company: "",
        role: "",
        status: "",
        date: "",
        duties: "",
        requirements: "",
        address: "",
        contact: "",
        extraInfo: "",
      });
    }
  };

  // Delete application
  const handleDelete = async (index: number) => {
    const newApps = applications.filter((_, i) => i !== index);
    await saveApplications(newApps);
  };

  // Edit application
  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setEditingData({ ...applications[index] });
  };

  const handleEditChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (!editingData) return;
    setEditingData({ ...editingData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    if (editingIndex !== null && editingData) {
      const updatedApps = [...applications];
      updatedApps[editingIndex] = editingData;
      await saveApplications(updatedApps);
      setEditingIndex(null);
      setEditingData(null);
    }
  };

  const handleEditCancel = () => {
    setEditingIndex(null);
    setEditingData(null);
  };

  // Filter and sort
  const filteredApps = applications
    .filter((app) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        (!searchQuery ||
          app.company.toLowerCase().includes(searchLower) ||
          app.role.toLowerCase().includes(searchLower)) &&
        (!filterStatus || app.status === filterStatus)
      );
    })
    .sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return sortOrder === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return (
    <div>
      <Navbar />
      <BackButton />

      <div
        className="dashboard-content"
        style={{ display: "flex", gap: "2rem" }}
      >
        {/* Left column: Form */}
        <div className="dashboard-form" style={{ flex: 1 }}>
          <form className="dashboardForm" onSubmit={handleAddApplication}>
            <h2>Job Application Dashboard</h2>
            <label>
              Company:{" "}
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </label>
            <label>
              Role:{" "}
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
              />
            </label>
            <label>
              Status:
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="Rejected">Rejected</option>
                <option value="Applied">Applied</option>
                <option value="Interviewed">Interviewed</option>
              </select>
            </label>
            <label>
              Date Applied:{" "}
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </label>
            <label>
              Duties:{" "}
              <input
                type="text"
                name="duties"
                value={formData.duties}
                onChange={handleChange}
              />
            </label>
            <label>
              Requirements:{" "}
              <input
                type="text"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
              />
            </label>
            <label>
              Address:{" "}
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </label>
            <label>
              Contact:{" "}
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
              />
            </label>
            <label>
              Extra Info:{" "}
              <textarea
                name="extraInfo"
                value={formData.extraInfo}
                onChange={handleChange}
              />
            </label>
            <button className="submit-btn " type="submit">
              Add Application
            </button>
          </form>

          {/* left column controls remain form-only */}
        </div>

        {/* Right column: Job Cards */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {/* Search / Filter / Sort + Nav above job cards */}
          <div
            className="dashboard-controls"
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
            >
              <h3 style={{ margin: 0 }}>Search / Filter / Sort</h3>
              <input
                style={{ marginLeft: "0.5rem" }}
                type="text"
                placeholder="Search by company or role"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              >
                <option value="asc">Date ↑</option>
                <option value="desc">Date ↓</option>
              </select>
            </div>

            <nav
              style={{ display: "flex", gap: "0.5rem" }}
              aria-label="status-nav"
            >
              <button
                onClick={() => setFilterStatus("")}
                style={{ padding: "0.4rem 0.6rem" }}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus("Applied")}
                style={{ padding: "0.4rem 0.6rem" }}
              >
                Applied
              </button>
              <button
                onClick={() => setFilterStatus("Interviewed")}
                style={{ padding: "0.4rem 0.6rem" }}
              >
                Interviewed
              </button>
              <button
                onClick={() => setFilterStatus("Rejected")}
                style={{ padding: "0.4rem 0.6rem" }}
              >
                Rejected
              </button>
            </nav>
          </div>

          <div
            className="cards-container"
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {filteredApps.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  color: "#7f8c8d",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  border: "2px dashed #dee2e6",
                }}
              >
                <h3 style={{ margin: "0 0 0.5rem 0" }}>
                  No Job Applications Yet
                </h3>
                <p style={{ margin: "0" }}>
                  Add your first job application using the form on the left!
                </p>
              </div>
            ) : (
              filteredApps.map((app, index) => (
                <JobCard
                  key={app.id}
                  application={app}
                  index={index}
                  onDelete={handleDelete}
                  onEdit={handleEditClick}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingData && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "8px",
              width: "300px",
            }}
          >
            <h3>Edit Application</h3>
            <label>
              Company:{" "}
              <input
                type="text"
                name="company"
                value={editingData.company}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Role:{" "}
              <input
                type="text"
                name="role"
                value={editingData.role}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Status:
              <select
                name="status"
                value={editingData.status}
                onChange={handleEditChange}
              >
                <option value="">Select Status</option>
                <option value="Rejected">Rejected</option>
                <option value="Applied">Applied</option>
                <option value="Interviewed">Interviewed</option>
              </select>
            </label>
            <label>
              Date:{" "}
              <input
                type="date"
                name="date"
                value={editingData.date}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Duties:{" "}
              <input
                type="text"
                name="duties"
                value={editingData.duties}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Requirements:{" "}
              <input
                type="text"
                name="requirements"
                value={editingData.requirements}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Address:{" "}
              <input
                type="text"
                name="address"
                value={editingData.address}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Contact:{" "}
              <input
                type="text"
                name="contact"
                value={editingData.contact}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Extra Info:{" "}
              <textarea
                name="extraInfo"
                value={editingData.extraInfo}
                onChange={handleEditChange}
              />
            </label>
            <div style={{ marginTop: "1rem" }}>
              <button
                onClick={handleEditSave}
                style={{ marginRight: "0.5rem" }}
              >
                Save
              </button>
              <button onClick={handleEditCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
