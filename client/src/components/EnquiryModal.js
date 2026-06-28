import React, { useState } from 'react';
import axios from 'axios';

function EnquiryModal({ onClose, defaultCourse = '', defaultMessage = '' }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    course: defaultCourse,
    message: defaultMessage,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('/api/enquiry', form);
      const emailSent = response.data?.emailSent;
      const autoReplySent = response.data?.autoReplySent;
      const message = emailSent
        ? 'Enquiry submitted successfully! We will contact you soon.'
        : autoReplySent
          ? 'Your enquiry was saved and a confirmation email is on its way.'
          : 'Your enquiry was saved, but the email notification could not be sent.';
      setSuccess(message);
      setForm({ name: '', email: '', phone: '', course: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>Enquire Now</h2>

        <input
          type="text"
          name="name"
          placeholder="Your Name *"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address *"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="course"
          placeholder="Course Interested In"
          value={form.course}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
        />

        {success && (
          <div style={{ marginTop: '12px', padding: '12px 14px', borderRadius: '8px', background: '#eaf8ef', color: '#17653a', border: '1px solid #b9e4c9' }}>
            {success}
          </div>
        )}
        {error && (
          <div style={{ marginTop: '12px', padding: '12px 14px', borderRadius: '8px', background: '#fdeaea', color: '#a12727', border: '1px solid #f2b8b8' }}>
            {error}
          </div>
        )}

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EnquiryModal;
