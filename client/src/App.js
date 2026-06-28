import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Courses from './components/Courses';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';
import './App.css';
import './styles/cinematicAnimations.css';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Loader active={loading} onFinish={() => setLoading(false)} />
      <div id="site-content" className={loading ? '' : 'visible'}>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute><AdminDashboard /></ProtectedRoute>
            } />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
