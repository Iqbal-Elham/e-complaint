import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import { LiaTimesSolid } from 'react-icons/lia';
import useUser from '../context/userUser';
import { FaBell } from 'react-icons/fa';
import axios from 'axios';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [activeLanguage, setActiveLanguage] = useState(i18n.language);
  const [mobileMenu, setMobileMenu] = useState(document.body.clientWidth > 540);
  const [notifications, setNotifications] = useState([]);

  const { logout, user } = useUser();

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
  };

  useEffect(() => {
    setActiveLanguage(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}notifications/`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      })
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const isActive = (language) => {
    return activeLanguage === language ? 'text-white' : 'text-black';
  };

  window.addEventListener('resize', () => {
    if (document.body.clientWidth > 540) {
      setMobileMenu(true);
    } else {
      setMobileMenu(false);
    }
  });

  const handleHideMenu = () => {
    if (document.body.clientWidth <= 540) {
      setMobileMenu(false);
    }
  };

  return (
    <>
      <div>
        <nav className="z-0 h-20 bg-blue-500 flex justify-around items-center px-4 md:0">
          <div className="flex items-center">
            <Link
              to="/"
              rel="home"
              className="flex items-center justify-center"
            >
              <img src={logo} width="60" height="60" alt="logo" />
              <div className="flex justify-center items-center flex-col mr-2 text-md leading-4 text-white">
                <p className="text-xl">{t('ministry_brand')}</p>
                <p>{t('save_complaint')}</p>
              </div>
            </Link>
            <div className="flex mx-4 relative group">
              <FaBell color="white" size={20} className="z-50" />

              <ul className="z-50 group-hover:block hidden absolute top-full  w-72 rounded max-h-96 overflow-auto bg-gray-50 px-4 py-2 right-0">
                <li className="text-center text-blue-500 font-bold text-lg">
                  اعلامیه های شما
                </li>
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className="w-full rounded hover:shadow-xl shadow-md p-2 text-gray-900 flex flex-col"
                  >
                    <Link to={`complaint/${notification.complaint.id}`}>
                      <p className="font-bold">
                        شکایت شماره {notification.complaint?.id}
                      </p>
                      {t(`notification_messages.${notification.message}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="text-white text-xl sm:hidden cursor-pointer">
            {mobileMenu ? (
              <LiaTimesSolid onClick={() => setMobileMenu(false)} />
            ) : (
              <GiHamburgerMenu onClick={() => setMobileMenu(true)} />
            )}
          </div>
          {mobileMenu && (
            <div className="absolute top-20 z-50 left-0 right-0 bg-blue-500 sm:static select-none">
              <div className="flex flex-col items-center sm:flex-row pb-4 sm:pb-0">
                {user && (
                  <Link
                    to="/dashboard"
                    className="text-white cursor-pointer hover:text-black text-xl md:text-2xl mx-4 my-2 sm:my-0"
                    onClick={handleHideMenu}
                  >
                    {user?.is_staff ? <p>دشبورد</p> : <p>شکایات من</p>}
                  </Link>
                )}
                {!user?.is_staff && (
                  <>
                    <Link
                      to="/new"
                      className="text-white cursor-pointer hover:text-black text-xl md:text-2xl mx-4 my-2 sm:my-0"
                      onClick={handleHideMenu}
                    >
                      <p>{t('newComplaint')}</p>
                    </Link>
                    <Link
                      to="/about-us"
                      onClick={handleHideMenu}
                      className="text-white cursor-pointer hover:text-black text-xl md:text-2xl mx-4 my-2 sm:my-0"
                    >
                      <p>{t('about')}</p>
                    </Link>
                  </>
                )}
                <div className="flex items-center gap-3 mx-6 my-2 sm:my-0">
                  <p
                    className={`text-white ${isActive(
                      'fa'
                    )} cursor-pointer hover:text-black text-xl md:text-2xl`}
                    onClick={() => {
                      handleHideMenu();
                      changeLanguage('fa');
                    }}
                  >
                    دری
                  </p>
                  <span className="text-white">|</span>
                  <p
                    className={`text-white ${isActive(
                      'ps'
                    )} cursor-pointer hover:text-black text-xl md:text-2xl`}
                    onClick={() => {
                      handleHideMenu();
                      changeLanguage('ps');
                    }}
                  >
                    پشتو
                  </p>
                </div>
                {user ? (
                  <button
                    onClick={() => {
                      handleHideMenu();
                      return logout();
                    }}
                    className="text-white cursor-pointer hover:text-black text-xl md:text-2xl mx-4 my-2 sm:my-0"
                  >
                    <p>{t('logout')}</p>
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={handleHideMenu}
                    className="text-white cursor-pointer hover:text-black text-xl md:text-2xl mx-4 my-2 sm:my-0"
                  >
                    <p>
                      {t('login')} / {t('register')}
                    </p>
                  </Link>
                )}
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
