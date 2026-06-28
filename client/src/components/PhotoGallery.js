import React, { useState, useEffect } from 'react';

const ENABLE_ADMIN_MODE = true;

const ACHIEVEMENT_QUOTES = [
  {
    quote: 'The best proof of learning is a student who can build, explain, and improve their own work.',
    label: 'Project-first learning',
  },
  {
    quote: 'Confidence grows when students see their ideas become real products, not just assignments.',
    label: 'Student confidence',
  },
  {
    quote: 'Every completed project becomes a portfolio story, a skill signal, and a step toward opportunity.',
    label: 'Career readiness',
  },
];

const REVIEWS = [
  {
    name: 'VS Academy',
    role: 'Academy Partner · C & C++ Training',
    type: 'Academy Review',
    text: 'The C and C++ sessions gave our learners a clear foundation in programming logic through structured explanations and practical exercises.',
  },
  {
    name: 'Madha Academy',
    role: 'Academy Partner · Java & Python Training',
    type: 'Academy Review',
    text: 'Students responded well to the hands-on Java and Python activities. The sessions made coding concepts easier to understand and apply.',
  },
  {
    name: 'Aram Academy',
    role: 'Academy Partner · UI/UX & Designing',
    type: 'Academy Review',
    text: 'The UI/UX and designing program encouraged students to think creatively while learning practical design principles and digital tools.',
  },
  {
    name: 'Shubam Academy',
    role: 'Academy Partner · Robotics Training',
    type: 'Academy Review',
    text: 'The robotics sessions kept students curious and involved. Building and testing their own ideas made the learning experience memorable.',
  },
  {
    name: 'Priya S.',
    role: 'Python Learner',
    type: 'Student Review',
    text: 'Python became much easier when each concept was followed by a small program. I can now write and explain my own code with confidence.',
  },
  {
    name: 'Kavin R.',
    role: 'C & C++ Learner',
    type: 'Student Review',
    text: 'The examples helped me understand loops, functions, arrays, and problem-solving instead of memorising syntax without knowing how to use it.',
  },
  {
    name: 'Arun M.',
    role: 'Java Learner',
    type: 'Student Review',
    text: 'The Java training was well paced and practical. Regular exercises helped me understand object-oriented programming more clearly.',
  },
  {
    name: 'Meena V.',
    role: 'UI/UX & Designing Learner',
    type: 'Student Review',
    text: 'I learned how layout, colour, typography, and user needs work together. The design tasks helped me turn ideas into clear interfaces.',
  },
  {
    name: 'Harish K.',
    role: 'Robotics Learner',
    type: 'Student Review',
    text: 'Building a working robotics model made the technical concepts exciting. Testing and improving it was the best part of the course.',
  },
];

const DEFAULT_PHOTOS = [
  {
    id: 1,
    title: 'Hands-on Project Lab',
    kicker: 'Real Build Experience',
    description: 'Students working directly with real-world technologies and frameworks, building projects from concept to completion.',
    imageUrl: '/gallery-images/gallery-1.jpg',
  },
  {
    id: 2,
    title: 'Mentor Feedback Session',
    kicker: 'Guided Learning',
    description: 'One-on-one guidance where mentors help refine code logic, design patterns, and best practices for professional development.',
    imageUrl: '/gallery-images/gallery-2.jpg',
  },
  {
    id: 3,
    title: 'Student Presentation',
    kicker: 'Confidence & Communication',
    description: 'Students presenting their projects and explaining their technical decisions to peers and instructors with confidence.',
    imageUrl: '/gallery-images/gallery-3.jpg',
  },
  {
    id: 4,
    title: 'Creative UI Workshop',
    kicker: 'Design Thinking',
    description: 'Interactive sessions focused on responsive design, user experience principles, and modern interface development techniques.',
    imageUrl: '/gallery-images/gallery-4.jpg',
  },
  {
    id: 5,
    title: 'Team Collaboration',
    kicker: 'Problem Solving',
    description: 'Students collaborating on group projects, learning teamwork skills and how to tackle challenges collectively.',
    imageUrl: '/gallery-images/gallery-5.jpg',
  },
  {
    id: 6,
    title: 'Achievement Celebration',
    kicker: 'Recognized Growth',
    description: 'Celebrating student milestones and recognizing outstanding performance in coursework and project completion.',
    imageUrl: '/gallery-images/gallery-6.jpg',
  },
  {
    id: 7,
    title: 'Workshop Highlight',
    kicker: 'Live Session',
    description: 'Engaging live training sessions where concepts are explained, demonstrated, and practiced in real-time with the entire cohort.',
    imageUrl: '/gallery-images/gallery-7.jpg',
  },
  {
    id: 8,
    title: 'Campus Activity',
    kicker: 'Student Engagement',
    description: 'Creating an interactive learning environment where students stay engaged through practical exercises and creative challenges.',
    imageUrl: '/gallery-images/gallery-8.jpg',
  },
  {
    id: 9,
    title: 'Event Moment',
    kicker: 'Celebration',
    description: 'Special moments from training events and student gatherings that build community and strengthen peer connections.',
    imageUrl: '/gallery-images/gallery-9.jpg',
  },
  {
    id: 10,
    title: 'Special Gathering',
    kicker: 'Community Learning',
    description: 'Building a collaborative learning community where knowledge is shared, experiences are celebrated, and everyone grows together.',
    imageUrl: '/gallery-images/gallery-10.jpg',
  },
  {
    id: 11,
    title: 'Studio Showcase',
    kicker: 'Creative Spotlight',
    description: 'A landscape shot capturing the practical studio energy of students collaborating on design and development.',
    imageUrl: '/gallery-images/gallery-11.jpg',
  },
  {
    id: 12,
    title: 'Team Problem Solving',
    kicker: 'Active Collaboration',
    description: 'Students working together to solve technical challenges and build stronger project outcomes.',
    imageUrl: '/gallery-images/gallery-12.jpg',
  },
  {
    id: 13,
    title: 'Classroom Energy',
    kicker: 'Focused Learning',
    description: 'A lively classroom scene where learners stay engaged through practical tasks and peer discussion.',
    imageUrl: '/gallery-images/gallery-13.jpg',
  },
  {
    id: 14,
    title: 'Focus Session',
    kicker: 'Technical Practice',
    description: 'Participants deep in concentration during a hands-on coding and project development session.',
    imageUrl: '/gallery-images/gallery-14.jpg',
  },
  {
    id: 15,
    title: 'Learning Celebration',
    kicker: 'Skill Milestone',
    description: 'A moment of achievement after completing a learning milestone or finishing an important project step.',
    imageUrl: '/gallery-images/gallery-15.jpg',
  },
];

function PhotoGallery({ reviewsOnly = false }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [formData, setFormData] = useState({ title: '', imageUrl: '' });
  const [isAdmin, setIsAdmin] = useState(false);
  const [photos, setPhotos] = useState(DEFAULT_PHOTOS);

  useEffect(() => {
    if (ENABLE_ADMIN_MODE) {
      const adminToken = localStorage.getItem('adminToken');
      setIsAdmin(!!adminToken);
    } else {
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    if (!activePhoto) return undefined;

    const handleKeyDown = (event) => {
      const currentIndex = photos.findIndex(photo => photo.id === activePhoto.id);

      if (event.key === 'Escape') setActivePhoto(null);
      if (event.key === 'ArrowLeft') {
        setActivePhoto(photos[(currentIndex - 1 + photos.length) % photos.length]);
      }
      if (event.key === 'ArrowRight') {
        setActivePhoto(photos[(currentIndex + 1) % photos.length]);
      }
    };

    document.body.classList.add('gallery-lightbox-open');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('gallery-lightbox-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePhoto, photos]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddPhoto = (e) => {
    e.preventDefault();
    if (formData.title && formData.imageUrl) {
      const newPhoto = {
        id: photos.length + 1,
        title: formData.title,
        kicker: 'New Highlight',
        description: 'A new moment in our learning journey',
        imageUrl: formData.imageUrl,
      };
      setPhotos([...photos, newPhoto]);
      setFormData({ title: '', imageUrl: '' });
      setShowAddForm(false);
    }
  };

  const handleDeletePhoto = (id) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };

  const featuredPhoto = photos[0];
  const galleryPhotos = photos.slice(1);
  const visibleGalleryPhotos = showAllPhotos ? galleryPhotos : galleryPhotos.slice(0, 6);

  const showAdjacentPhoto = (direction) => {
    const currentIndex = photos.findIndex(photo => photo.id === activePhoto.id);
    const nextIndex = (currentIndex + direction + photos.length) % photos.length;
    setActivePhoto(photos[nextIndex]);
  };

  const reviewSlider = (
    <div className="review-slider" aria-label="Student and organization reviews">
      <div className="review-slider-header">
        <span>What learners and partners say</span>
      </div>
      <div className="review-slider-window">
        <div className="review-track">
          {[...REVIEWS, ...REVIEWS].map((review, index) => (
            <article className="review-card" key={`${review.name}-${index}`}>
              <div className="review-card-top">
                <span>{review.type}</span>
                <strong>{review.name}</strong>
              </div>
              <p>{review.text}</p>
              <small>{review.role}</small>
            </article>
          ))}
        </div>
      </div>
    </div>
  );

  if (reviewsOnly) {
    return (
      <section className="reviews-only-section">
        <div className="container">
          <header className="reviews-only-header">
            <p>Community voices</p>
            <h2>Trusted by learners and academy partners.</h2>
          </header>
          {reviewSlider}
        </div>
      </section>
    );
  }

  return (
    <section className="photo-gallery-section">
      <div className="container">
        <div className="gallery-header">
          <div className="gallery-header-copy">
            <p className="gallery-eyebrow">Student Work & Recognition</p>
            <h2>Learning, captured in action.</h2>
          </div>
          <div className="gallery-header-context">
            <p className="gallery-subtitle">
              Real workshops, project reviews, collaborations, and milestones from the Yathirai learning community.
            </p>
            <div className="gallery-count" aria-label={`${photos.length} gallery moments`}>
              <strong>{String(photos.length).padStart(2, '0')}</strong>
              <span>Moments documented</span>
            </div>
          </div>
        </div>

        <div className="rich-gallery-layout">
          {featuredPhoto && (
            <article className="featured-gallery-card">
              <img src={featuredPhoto.imageUrl} alt={featuredPhoto.title} decoding="async" />
              <div className="gallery-card-overlay">
                <span>{featuredPhoto.kicker}</span>
                <h3>{featuredPhoto.title}</h3>
                <p className="gallery-description">{featuredPhoto.description}</p>
              </div>
              <button
                className="gallery-card-hitarea"
                type="button"
                aria-label={`Open ${featuredPhoto.title}`}
                onClick={() => setActivePhoto(featuredPhoto)}
              />
              {isAdmin && (
                <button
                  className="delete-btn"
                  aria-label={`Delete ${featuredPhoto.title}`}
                  onClick={() => handleDeletePhoto(featuredPhoto.id)}
                >
                  x
                </button>
              )}
            </article>
          )}

          <div className="gallery-card-grid">
            {visibleGalleryPhotos.map((photo, index) => (
              <article className="gallery-visual-card" key={photo.id}>
                <img src={photo.imageUrl} alt={photo.title} loading="lazy" decoding="async" />
                <div className="gallery-card-overlay">
                  <span>{photo.kicker}</span>
                  <h3>{photo.title}</h3>
                  <p className="gallery-description">{photo.description}</p>
                </div>
                <span className="gallery-index" aria-hidden="true">{String(index + 2).padStart(2, '0')}</span>
                <button
                  className="gallery-card-hitarea"
                  type="button"
                  aria-label={`Open ${photo.title}`}
                  onClick={() => setActivePhoto(photo)}
                />
                {isAdmin && (
                  <button
                    className="delete-btn"
                    aria-label={`Delete ${photo.title}`}
                    onClick={() => handleDeletePhoto(photo.id)}
                  >
                    x
                  </button>
                )}
              </article>
            ))}
          </div>
        </div>

        {galleryPhotos.length > 6 && (
          <div className="gallery-view-controls">
            <button
              className="gallery-view-toggle"
              type="button"
              onClick={() => setShowAllPhotos(current => !current)}
            >
              {showAllPhotos ? 'Show curated view' : `View all ${photos.length} moments`}
            </button>
          </div>
        )}

        <div className="gallery-proof-strip" aria-label="Achievement summary">
          <div>
            <strong>Project-led</strong>
            <span>Training that ends with visible work</span>
          </div>
          <div>
            <strong>Portfolio-ready</strong>
            <span>Students leave with work they can present</span>
          </div>
          <div>
            <strong>Mentor guided</strong>
            <span>Feedback at every important step</span>
          </div>
        </div>

        <div className="achievement-quotes">
          {ACHIEVEMENT_QUOTES.map(item => (
            <figure className="achievement-quote" key={item.label}>
              <blockquote>{item.quote}</blockquote>
              <figcaption>{item.label}</figcaption>
            </figure>
          ))}
        </div>

        {reviewSlider}

        <div className="gallery-controls">
          {isAdmin && (
            <button
              className="add-photo-btn"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              Add Photo
            </button>
          )}
        </div>

        {isAdmin && showAddForm && (
          <div className="add-photo-form">
            <h3>Add New Photo</h3>
            <form onSubmit={handleAddPhoto}>
              <input
                type="text"
                name="title"
                placeholder="Photo Title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
              <input
                type="url"
                name="imageUrl"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={handleInputChange}
                required
              />
              <div className="form-buttons">
                <button type="submit" className="submit-btn">
                  Add Photo
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {activePhoto && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={activePhoto.title}>
          <button
            className="gallery-lightbox-backdrop"
            type="button"
            aria-label="Close gallery viewer"
            onClick={() => setActivePhoto(null)}
          />
          <div className="gallery-lightbox-dialog">
            <div className="gallery-lightbox-media">
              <img src={activePhoto.imageUrl} alt={activePhoto.title} />
              <button
                className="gallery-lightbox-close"
                type="button"
                aria-label="Close gallery viewer"
                onClick={() => setActivePhoto(null)}
              >
                &times;
              </button>
              <button
                className="gallery-lightbox-nav gallery-lightbox-prev"
                type="button"
                aria-label="Previous photo"
                onClick={() => showAdjacentPhoto(-1)}
              >
                &#8249;
              </button>
              <button
                className="gallery-lightbox-nav gallery-lightbox-next"
                type="button"
                aria-label="Next photo"
                onClick={() => showAdjacentPhoto(1)}
              >
                &#8250;
              </button>
            </div>
            <div className="gallery-lightbox-caption">
              <span>{activePhoto.kicker}</span>
              <h3>{activePhoto.title}</h3>
              <p>{activePhoto.description}</p>
              <small>{String(photos.findIndex(photo => photo.id === activePhoto.id) + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</small>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default PhotoGallery;
