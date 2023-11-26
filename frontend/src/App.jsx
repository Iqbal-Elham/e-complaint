import { useState } from 'react';
import Navbar from './components/Navbar';
import { useTranslation } from 'react-i18next';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './containers/Homepage';
import NewComplaint from './containers/NewComplaints';
import { Outlet } from 'react-router';
import Footer from './components/Footer';
import ComplaintDetails from './containers/ComplaintDetails';
import AboutUs from './containers/AboutUs';

function App() {
  const { t } = useTranslation();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <Navbar />
            <Outlet />
            <Footer />
          </div>
        }
      >
        <Route index element={<Homepage />} />
        <Route path="/new" element={<NewComplaint />} />
        <Route path="/complaint/:id" element={<ComplaintDetails />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
