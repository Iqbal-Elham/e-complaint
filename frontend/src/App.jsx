import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { useTranslation } from 'react-i18next';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './containers/Homepage';
import NewComplaint from './containers/NewComplaints';
import { Outlet } from 'react-router';
import Footer from './components/Footer';
import ComplaintDetails from './containers/ComplaintDetails';
import AboutUs from './containers/AboutUs';
import LoginPage from './containers/Login';
import Register from './containers/Register';
import useUser from './context/userUser';
import Dashboard from './containers/Dashboard';

function App() {
  const { t } = useTranslation();

  const auth = useUser();

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
        {auth && auth.user && (
          <>
            <Route path="/new" element={<NewComplaint />} />
          </>
        )}

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/complaint/:id" element={<ComplaintDetails />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
