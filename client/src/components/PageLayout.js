import React, { useState } from 'react';
import Navbar from './Navbar';
import EnquiryModal from './EnquiryModal';
import Footer from './Footer';

function PageLayout({ children, bg = 'bg.png' }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar onEnquire={() => setShowModal(true)} />
      <div
        className="page-wrapper"
        style={{ backgroundImage: `url(/${bg})` }}
      >
        <div className="overlay" />
        {children}
      </div>
      <Footer />
      {showModal && <EnquiryModal onClose={() => setShowModal(false)} />}
    </>
  );
}

export default PageLayout;
