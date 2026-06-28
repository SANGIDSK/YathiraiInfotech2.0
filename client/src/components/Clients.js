import React from 'react';
import PageLayout from './PageLayout';

const testimonials = [
  { name: 'Arun Kumar', role: 'Full Stack Developer @ TCS', text: 'Yathirai InfoTech gave me the real-world skills that college never did. I landed my first job within 2 months of completing the course.' },
  { name: 'Priya Ramesh', role: 'Data Analyst @ Infosys', text: 'The mentors here are working professionals. Every session felt practical and relevant. Best investment I made for my career.' },
  { name: 'Karthik S.', role: 'React Developer @ Startup', text: 'I was a complete beginner. The course structure was clear, the support was incredible, and now I build production apps daily.' },
  { name: 'Sneha M.', role: 'Backend Engineer @ Wipro', text: 'What separates Yathirai from others is the focus on actual coding, not just watching slides. I feel confident in interviews now.' },
  { name: 'Vijay D.', role: 'DevOps Engineer @ HCL', text: 'The DevOps course here is exceptionally detailed. Got placed with a 40% salary hike thanks to the skills I learned.' },
  { name: 'Lakshmi P.', role: 'UI Developer @ Freelance', text: 'They taught me how to think like a developer. The project-based learning was a game-changer for my portfolio.' },
];

const stats = [
  { value: '500+', label: 'Students Trained' },
  { value: '95%', label: 'Placement Rate' },
  { value: '50+', label: 'Hiring Partners' },
  { value: '4.9★', label: 'Average Rating' },
];

function Clients() {
  return (
    <PageLayout>
      <div className="page-content">
        <div className="page-header">
          <p className="tag">Our Success Stories</p>
          <h1>Our Clients</h1>
          <p className="page-sub">Real students. Real results. Real careers.</p>
        </div>

        {/* Stats */}
        <div className="stats-row">
          {stats.map((s, i) => (
            <div className="stat-card" key={i}>
              <h2>{s.value}</h2>
              <p>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.name[0]}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

export default Clients;
