import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import i18n from './i18n';

const userLanguage = localStorage.getItem('selectedLanguage');
if (userLanguage) {
  i18n.changeLanguage(userLanguage);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
