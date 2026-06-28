import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const api = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');
  const username = localStorage.getItem('adminUser');

  const [tab, setTab] = useState('enquiries');
  const [enquiries, setEnquiries] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [courseForm, setCourseForm] = useState({ title: '', description: '', duration: '', level: 'Beginner', price: '', category: '' });
  const [editingId, setEditingId] = useState(null);
  const [formMsg, setFormMsg] = useState('');

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin');
  };

  const fetchData = useCallback(async () => {
    if (!token) { navigate('/admin'); return; }
    setLoading(true);
    try {
      const [eq, co] = await Promise.all([
        axios.get('/api/enquiry', api(token)),
        axios.get('/api/courses/all', api(token)),
      ]);
      setEnquiries(eq.data);
      setCourses(co.data);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  }, [token, navigate]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleCourseSubmit = async () => {
    setFormMsg('');
    try {
      if (editingId) {
        await axios.put(`/api/courses/${editingId}`, courseForm, api(token));
        setFormMsg('Course updated!');
      } else {
        await axios.post('/api/courses', courseForm, api(token));
        setFormMsg('Course created!');
      }
      setCourseForm({ title: '', description: '', duration: '', level: 'Beginner', price: '', category: '' });
      setEditingId(null);
      fetchData();
    } catch (err) {
      setFormMsg(err.response?.data?.error || 'Error saving course.');
    }
  };

  const handleEdit = (course) => {
    setCourseForm({
      title: course.title,
      description: course.description || '',
      duration: course.duration || '',
      level: course.level,
      price: course.price || '',
      category: course.category || '',
    });
    setEditingId(course._id);
    setTab('add-course');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    await axios.delete(`/api/courses/${id}`, api(token));
    fetchData();
  };

  const toggleActive = async (course) => {
    await axios.put(`/api/courses/${course._id}`, { isActive: !course.isActive }, api(token));
    fetchData();
  };

  return (
    <div className="admin-dash">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src="/logo.png" alt="logo" />
          <span>Admin Panel</span>
        </div>
        <nav className="admin-nav">
          {[
            { key: 'enquiries', label: '📩 Enquiries', count: enquiries.length },
            { key: 'courses', label: '📚 Courses', count: courses.length },
            { key: 'add-course', label: editingId ? '✏️ Edit Course' : '➕ Add Course' },
          ].map(item => (
            <button
              key={item.key}
              className={`admin-nav-btn ${tab === item.key ? 'active' : ''}`}
              onClick={() => { setTab(item.key); if (item.key !== 'add-course') { setEditingId(null); setCourseForm({ title: '', description: '', duration: '', level: 'Beginner', price: '', category: '' }); } }}
            >
              {item.label}
              {item.count !== undefined && <span className="nav-count">{item.count}</span>}
            </button>
          ))}
        </nav>
        <div className="admin-footer-nav">
          <p className="admin-user">👤 {username}</p>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        {loading ? (
          <div className="loading-spinner"><div className="spinner" /><p>Loading...</p></div>
        ) : (
          <>
            {/* ENQUIRIES TAB */}
            {tab === 'enquiries' && (
              <div>
                <h2 className="dash-title">📩 Enquiries <span>({enquiries.length})</span></h2>
                {enquiries.length === 0 ? (
                  <div className="empty-state"><p>No enquiries yet.</p></div>
                ) : (
                  <div className="enquiry-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Course</th>
                          <th>Message</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {enquiries.map((e, i) => (
                          <tr key={e._id}>
                            <td>{i + 1}</td>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{e.phone || '—'}</td>
                            <td>{e.course || '—'}</td>
                            <td className="msg-cell">{e.message || '—'}</td>
                            <td>{new Date(e.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* COURSES TAB */}
            {tab === 'courses' && (
              <div>
                <h2 className="dash-title">📚 Courses <span>({courses.length})</span></h2>
                {courses.length === 0 ? (
                  <div className="empty-state"><p>No courses yet. Add one!</p></div>
                ) : (
                  <div className="courses-admin-grid">
                    {courses.map(c => (
                      <div className={`admin-course-card ${!c.isActive ? 'inactive' : ''}`} key={c._id}>
                        <div className="acard-top">
                          <span className="level-badge" style={{ color: c.isActive ? '#4edd9d' : '#888', borderColor: c.isActive ? '#4edd9d' : '#888' }}>
                            {c.isActive ? 'Active' : 'Hidden'}
                          </span>
                          <span className="category-tag">{c.level}</span>
                        </div>
                        <h3>{c.title}</h3>
                        <p>{c.description}</p>
                        <div className="course-meta">
                          {c.duration && <span>⏱ {c.duration}</span>}
                          <span>{c.price > 0 ? `₹${c.price}` : 'Free'}</span>
                        </div>
                        <div className="admin-card-actions">
                          <button onClick={() => handleEdit(c)}>✏️ Edit</button>
                          <button onClick={() => toggleActive(c)}>{c.isActive ? '🙈 Hide' : '👁 Show'}</button>
                          <button className="del-btn" onClick={() => handleDelete(c._id)}>🗑 Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ADD/EDIT COURSE TAB */}
            {tab === 'add-course' && (
              <div>
                <h2 className="dash-title">{editingId ? '✏️ Edit Course' : '➕ Add New Course'}</h2>
                <div className="course-form-box">
                  <div className="form-row">
                    <input placeholder="Course Title *" value={courseForm.title} onChange={e => setCourseForm({ ...courseForm, title: e.target.value })} />
                    <input placeholder="Category (e.g. Web Dev)" value={courseForm.category} onChange={e => setCourseForm({ ...courseForm, category: e.target.value })} />
                  </div>
                  <textarea placeholder="Description" value={courseForm.description} onChange={e => setCourseForm({ ...courseForm, description: e.target.value })} rows={3} />
                  <div className="form-row">
                    <input placeholder="Duration (e.g. 3 months)" value={courseForm.duration} onChange={e => setCourseForm({ ...courseForm, duration: e.target.value })} />
                    <input type="number" placeholder="Price (₹, 0 = Free)" value={courseForm.price} onChange={e => setCourseForm({ ...courseForm, price: e.target.value })} />
                    <select value={courseForm.level} onChange={e => setCourseForm({ ...courseForm, level: e.target.value })}>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>

                  {formMsg && <p className={formMsg.includes('!') ? 'success-msg' : 'error-msg'}>{formMsg}</p>}

                  <div className="form-actions">
                    {editingId && (
                      <button className="btn-cancel" onClick={() => { setEditingId(null); setCourseForm({ title: '', description: '', duration: '', level: 'Beginner', price: '', category: '' }); }}>
                        Cancel Edit
                      </button>
                    )}
                    <button className="explore-btn" onClick={handleCourseSubmit}>
                      {editingId ? 'Update Course' : 'Add Course'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
