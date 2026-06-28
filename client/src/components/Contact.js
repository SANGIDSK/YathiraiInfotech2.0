import React, { useState } from 'react';
import axios from 'axios';
import PageLayout from './PageLayout';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true); setError(''); setSuccess('');
    try {
      const response = await axios.post('/api/enquiry', form);
      const emailSent = response.data?.emailSent;
      const autoReplySent = response.data?.autoReplySent;
      const message = emailSent
        ? 'Message sent! We will get back to you shortly.'
        : autoReplySent
          ? 'Your enquiry was saved and a confirmation email is on its way.'
          : 'Your enquiry was saved, but the email notification could not be sent.';
      setSuccess(message);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="page-content">
        <div className="page-header">
          <p className="tag">Get In Touch</p>
          <h1>Contact Us</h1>
          <p className="page-sub">Have questions? We'd love to hear from you.</p>
        </div>

        <div className="contact-layout">
          {/* Contact Info */}
          <div className="contact-info">
            <div className="info-card">
              <span className="info-icon">📍</span>
              <div>
                <h4>Location</h4>
                <p>Vellore, Tamil Nadu, India</p>
              </div>
            </div>
            <div className="info-card">
              <span className="info-icon">📧</span>
              <div>
                <h4>Email</h4>
                <p>info@yathiraiinfotech.com</p>
              </div>
            </div>
            <div className="info-card">
              <span className="info-icon">📱</span>
              <div>
                <h4>Phone</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>
            <div className="info-card">
              <span className="info-icon">🕐</span>
              <div>
                <h4>Hours</h4>
                <p>Mon – Sat: 9 AM – 6 PM</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-box">
            <input type="text" name="name" placeholder="Your Name *" value={form.name} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email Address *" value={form.email} onChange={handleChange} />
            <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
            <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} rows={5} />

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

            <button className="explore-btn" onClick={handleSubmit} disabled={loading} style={{ width: '100%', marginTop: '8px' }}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default Contact;
