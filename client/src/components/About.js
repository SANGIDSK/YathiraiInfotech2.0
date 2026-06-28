import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import EnquiryModal from './EnquiryModal';
import PhotoGallery from './PhotoGallery';
import ScrollReveal from './ScrollReveal';
import Footer from './Footer';
import { fadeUpVariants, containerVariants } from '../utils/animationConfig';

const GAP_ITEMS = [
  {
    challenge: 'Too many choices',
    challengeDesc: 'Students jump between tools without knowing what matters first.',
    solution: 'Structured skill roadmap',
    solutionDesc: 'Students know what to learn, when to learn it, and how it connects.',
    outcomeTitle: 'Build',
    outcomeDesc: 'A clear roadmap turns confusion into steady progress from day one.',
  },
  {
    challenge: 'No real project confidence',
    challengeDesc: 'Concepts are learned, but not converted into visible work.',
    solution: 'Project-led delivery',
    solutionDesc: 'Every module pushes toward a visible, portfolio-ready outcome.',
    outcomeTitle: 'Review',
    outcomeDesc: 'Work gets shaped into something real, presentable, and worth showing.',
  },
  {
    challenge: 'Weak presentation skills',
    challengeDesc: 'Learners struggle to explain what they built and why it works.',
    solution: 'Mentor review loops',
    solutionDesc: 'Regular feedback improves code quality, design thinking, and confidence.',
    outcomeTitle: 'Present',
    outcomeDesc: 'Students learn to explain their work with clarity, structure, and confidence.',
  },
  {
    challenge: 'Career confusion',
    challengeDesc: 'There is no clear bridge from training to portfolio and interviews.',
    solution: 'Career-ready storytelling',
    solutionDesc: 'Students learn to present their work clearly to teams, clients, and interviewers.',
    outcomeTitle: 'Launch',
    outcomeDesc: 'Training connects to opportunities through stronger portfolios and better narratives.',
  },
];

const JOURNEY_STEPS = [
  {
    title: 'Discover',
    desc: 'Find the right path and understand the skills needed for your goal.',
    proof: 'Clarity before effort.',
    scene: 'discover',
    action: 'Map the right direction before training begins.',
    details: ['Skill audit', 'Goal mapping', 'Personal roadmap'],
  },
  {
    title: 'Practice',
    desc: 'Learn through guided exercises, live tasks, and focused project work.',
    proof: 'Hands-on work every stage.',
    scene: 'practice',
    action: 'Turn concepts into muscle memory with guided tasks.',
    details: ['Daily tasks', 'Mentor nudges', 'Live corrections'],
  },
  {
    title: 'Build',
    desc: 'Create real outputs that prove what you can design, code, and explain.',
    proof: 'Portfolio proof, not just notes.',
    scene: 'build',
    action: 'Assemble visible work that students can present.',
    details: ['Project sprint', 'Code review', 'Demo-ready output'],
  },
  {
    title: 'Launch',
    desc: 'Present your portfolio with confidence and prepare for the next opportunity.',
    proof: 'A stronger story for real conversations.',
    scene: 'launch',
    action: 'Package the work into a confident next step.',
    details: ['Portfolio polish', 'Presentation flow', 'Opportunity prep'],
  },
];

const WHY_NOW_ITEMS = [
  { title: 'Skills are becoming practical earlier', desc: 'Students who build and present projects early develop stronger confidence and clearer career direction.' },
  { title: 'Institutions need outcome-based training', desc: 'Workshops are more valuable when they end with demos, portfolios, and measurable learner progress.' },
  { title: 'The market rewards proof, not just certificates', desc: 'A visible project, a clear explanation, and mentor-backed practice help students stand out.' },
];

function About() {
  const [showModal, setShowModal] = useState(false);
  const [activeGapIndex, setActiveGapIndex] = useState(0);
  const [activeJourneyIndex, setActiveJourneyIndex] = useState(0);
  const [activeNeedIndex, setActiveNeedIndex] = useState(0);
  const [enquiryDefaults, setEnquiryDefaults] = useState({ course: '', message: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const activeGapItem = GAP_ITEMS[activeGapIndex];
  const activeJourney = JOURNEY_STEPS[activeJourneyIndex];
  const activeNeed = WHY_NOW_ITEMS[activeNeedIndex];

  const playClickTone = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(520, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(760, audioContext.currentTime + 0.08);
    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.035, audioContext.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.12);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.13);
    oscillator.onended = () => audioContext.close();
  };

  const selectWithTone = (setter, index) => {
    playClickTone();
    setter(index);
  };

  const openPathEnquiry = () => {
    playClickTone();
    setEnquiryDefaults({
      course: `${activeGapItem.challenge} to ${activeGapItem.outcomeTitle}`,
      message: `I am interested in the ${activeGapItem.challenge} to ${activeGapItem.outcomeTitle} path. ${activeGapItem.outcomeDesc}`,
    });
    setShowModal(true);
  };

  const openGeneralEnquiry = () => {
    playClickTone();
    setEnquiryDefaults({ course: '', message: '' });
    setShowModal(true);
  };

  return (
    <>
      <Navbar onEnquire={openGeneralEnquiry} />

      <motion.section
        id="about-us"
        className="about-intro"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <video autoPlay muted loop playsInline className="bg-video">
          <source src="/videos/tech-wave-bg.mp4" type="video/mp4" />
        </video>
        <div className="container">
          <div className="hero-content">
            <motion.div
              className="hero-main"
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              viewport={{ once: true }}
            >
              <motion.p
                className="hero-description"
                variants={fadeUpVariants}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Welcome to <span className="gradient-text">Yathirai InfoTech</span>, where innovation meets education and ideas turn into action. We empower <span className="gradient-text">school and college students</span> with modern technology training built on <span className="gradient-text">hands-on experience, not just theory</span>.<br/><br/>
                At Yathirai InfoTech, you do not just learn. You <span className="gradient-text">build, create, and innovate</span>. From real-world projects to skill-driven learning, we ignite curiosity, boost confidence, and shape future-ready minds.<br/><br/>
                <span className="gradient-text">Learn by doing. Create with purpose. Succeed with confidence.</span>
              </motion.p>
              <motion.div
                className="hero-progress-bar"
                variants={fadeUpVariants}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="progress-container">
                  <div className="progress-fill"></div>
                  <span className="progress-text">Building future-ready skills</span>
                </div>
              </motion.div>
              <motion.div
                className="hero-stats"
                variants={containerVariants}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="stat-item"
                  variants={fadeUpVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Students Empowered</div>
                </motion.div>
                <motion.div
                  className="stat-item"
                  variants={fadeUpVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="stat-number">95%</div>
                  <div className="stat-label">Success Rate</div>
                </motion.div>
                <motion.div
                  className="stat-item"
                  variants={fadeUpVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="stat-number">10+</div>
                  <div className="stat-label">Partners</div>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="visual-container">
                <div className="photo-glow"></div>
                <div className="photo-card">
                  <img src="/logo.png" alt="Yathirai InfoTech logo" className="photo-img" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <ScrollReveal variant="fadeUp">
        <PhotoGallery reviewsOnly />
      </ScrollReveal>

      <motion.section
        className="peace-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <ScrollReveal variant="fadeUp">
            <p className="section-kicker">The Gap We Solve</p>
            <h2>Students do not need more random tutorials. They need a guided path to build real proof of skill.</h2>
          </ScrollReveal>
          <motion.div
            className="problems-solutions"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
          >
            <ScrollReveal variant="fadeLeft" delay={0.2}>
              <div className="problems">
                <span className="panel-label">Before Yathirai</span>
                <h3>Common Challenges</h3>
                <div className="interactive-gap-list" role="tablist" aria-label="Common challenges">
                  {GAP_ITEMS.map((item, idx) => (
                    <button
                      key={item.challenge}
                      type="button"
                      className={`gap-item-card ${activeGapIndex === idx ? 'active gap-problem-active' : ''}`}
                      onClick={() => setActiveGapIndex(idx)}
                      aria-pressed={activeGapIndex === idx}
                    >
                      <span className="gap-item-dot" />
                      <strong>{item.challenge}</strong>
                      <span>{item.challengeDesc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="fadeRight" delay={0.3}>
              <div className="solutions">
                <span className="panel-label">With Yathirai</span>
                <h3>Our Operating System</h3>
                <div className="interactive-gap-list solution-gap-list" role="tablist" aria-label="Yathirai solutions">
                  {GAP_ITEMS.map((item, idx) => (
                    <button
                      key={item.solution}
                      type="button"
                      className={`gap-item-card solution-item-card ${activeGapIndex === idx ? 'active' : ''}`}
                      onClick={() => setActiveGapIndex(idx)}
                      aria-pressed={activeGapIndex === idx}
                    >
                      <span className="gap-item-dot success" />
                      <strong>{item.solution}</strong>
                      <span>{item.solutionDesc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </motion.div>
          <div className="transformation-popout" key={activeGapItem.challenge}>
            <span className="popout-index">{String(activeGapIndex + 1).padStart(2, '0')}</span>
            <div className="popout-copy">
              <small>Selected Transformation</small>
              <h3>{activeGapItem.challenge} to {activeGapItem.outcomeTitle}</h3>
              <p>{activeGapItem.outcomeDesc}</p>
            </div>
            <button className="popout-action" type="button" onClick={openPathEnquiry}>
              Start this path
            </button>
          </div>
        </div>
      </motion.section>

      <motion.section
        className={`learning-journey-section journey-mode-${activeJourney.scene}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <ScrollReveal variant="fadeUp">
            <p className="section-kicker">How Growth Happens</p>
            <h2>From curious beginner to confident builder.</h2>
          </ScrollReveal>
          <div className="journey-track">
            {JOURNEY_STEPS.map((item, idx) => (
              <ScrollReveal key={item.title} variant="fadeUp" delay={idx * 0.08}>
                <button
                  type="button"
                  className={`journey-item ${activeJourneyIndex === idx ? 'active' : ''}`}
                  onClick={() => selectWithTone(setActiveJourneyIndex, idx)}
                >
                  <span>{String(idx + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </button>
              </ScrollReveal>
            ))}
          </div>
          <div className={`journey-cinema journey-cinema-${activeJourney.scene}`} key={activeJourney.title}>
            <div className="journey-cinema-visual" aria-hidden="true">
              <div className="cinema-orbit orbit-one" />
              <div className="cinema-orbit orbit-two" />
              <div className="cinema-core">
                <span>{String(activeJourneyIndex + 1).padStart(2, '0')}</span>
                <strong>{activeJourney.title}</strong>
              </div>
              <div className="cinema-path">
                <i />
                <i />
                <i />
              </div>
              <div className="cinema-spark spark-one" />
              <div className="cinema-spark spark-two" />
              <div className="cinema-spark spark-three" />
            </div>
            <div className="journey-cinema-copy">
              <small>Current focus</small>
              <h3>{activeJourney.title}</h3>
              <p>{activeJourney.action}</p>
              <div className="journey-proof-line">{activeJourney.proof}</div>
              <div className="journey-detail-list">
                {activeJourney.details.map(detail => (
                  <span key={detail}>{detail}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="why-need"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <ScrollReveal variant="fadeUp">
            <p className="section-kicker">Why Now</p>
            <h2>Technology learning is changing. Students need practical guidance earlier.</h2>
          </ScrollReveal>
          <motion.div
            className="need-content"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
          >
            {WHY_NOW_ITEMS.map((item, idx) => (
              <ScrollReveal key={idx} variant={idx % 2 === 0 ? 'fadeLeft' : 'fadeRight'} delay={idx * 0.1}>
                <motion.button
                  type="button"
                  className={`need-item ${activeNeedIndex === idx ? 'active' : ''}`}
                  onClick={() => selectWithTone(setActiveNeedIndex, idx)}
                  whileHover={{ x: 10 }}
                >
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </motion.button>
              </ScrollReveal>
            ))}
          </motion.div>
          <div className="startup-cta-panel">
            <div>
              <span>Ready to build a stronger learning experience?</span>
              <h3>Bring project-based technology training to your students or start your own skill journey.</h3>
              <p>{activeNeed.desc}</p>
            </div>
            <button className="explore-btn" onClick={openGeneralEnquiry}>
              Enquire Now
            </button>
          </div>
        </div>
      </motion.section>

      <Footer />

      {showModal && (
        <EnquiryModal
          onClose={() => setShowModal(false)}
          defaultCourse={enquiryDefaults.course}
          defaultMessage={enquiryDefaults.message}
        />
      )}
    </>
  );
}

export default About;
