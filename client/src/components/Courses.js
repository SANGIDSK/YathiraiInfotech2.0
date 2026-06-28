import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageLayout from './PageLayout';
import EnquiryModal from './EnquiryModal';
import ScrollReveal from './ScrollReveal';

const levelColors = {
  Beginner: '#4edd9d',
  Intermediate: '#ff7a18',
  Advanced: '#9d4edd',
};

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [showEnquiry, setShowEnquiry] = useState(false);

  useEffect(() => {
    axios.get('/api/courses')
      .then(res => setCourses(res.data))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  const handleEnquire = (title) => {
    setSelectedCourse(title);
    setShowEnquiry(true);
  };

  return (
    <>
      <PageLayout>
        <div className="page-content">
          <ScrollReveal variant="fadeUp">
            <div className="page-header">
              <p className="tag">What We Offer</p>
              <h1>Our Courses</h1>
              <p className="page-sub">Practical, industry-aligned programs designed to make you job-ready.</p>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner" />
              <p>Loading courses...</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="empty-state">
              <p>Courses coming soon. Check back later!</p>
            </div>
          ) : (
            <div className="courses-grid">
              {courses.map((course, idx) => (
                <ScrollReveal key={course._id} variant="fadeUp" delay={idx * 0.08}>
                  <div className="course-card">
                    <div className="course-card-top">
                      <span
                        className="level-badge"
                        style={{ color: levelColors[course.level] || '#fff', borderColor: levelColors[course.level] || '#fff' }}
                      >
                        {course.level}
                      </span>
                      {course.category && <span className="category-tag">{course.category}</span>}
                    </div>

                    <h3>{course.title}</h3>
                    <p className="course-desc">{course.description}</p>

                    <div className="course-meta">
                      {course.duration && <span>Duration: {course.duration}</span>}
                      {course.price > 0
                        ? <span>Rs. {course.price.toLocaleString()}</span>
                        : <span className="free-tag">Free</span>
                      }
                    </div>

                    <button className="explore-btn course-btn" onClick={() => handleEnquire(course.title)}>
                      Enquire
                    </button>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </PageLayout>

      {showEnquiry && (
        <EnquiryModal
          onClose={() => setShowEnquiry(false)}
          defaultCourse={selectedCourse}
        />
      )}
    </>
  );
}

export default Courses;
