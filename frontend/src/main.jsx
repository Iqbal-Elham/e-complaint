import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import i18n from './i18n';
import { BrowserRouter } from 'react-router-dom';
import './fonts/Far.Nazanin.ttf';
import { ThemeProvider } from '@material-tailwind/react';
import AuthProvider from './context/AuthProvider.jsx';

const userLanguage = localStorage.getItem('selectedLanguage');
if (userLanguage) {
  i18n.changeLanguage(userLanguage);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
