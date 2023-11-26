import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { GiHamburgerMenu } from "react-icons/gi";
import { LiaTimesSolid } from "react-icons/lia";


const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [activeLanguage, setActiveLanguage] = useState(i18n.language);

  const [mobileMenu, setMobileMenu] = useState(document.body.clientWidth > 540)

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
  };

  useEffect(() => {
    setActiveLanguage(i18n.language);
  }, [i18n.language]);

  const isActive = (language) => {
    return activeLanguage === language ? 'text-white' : 'text-black';
  };

  window.addEventListener('resize', (event) => {
    if (document.body.clientWidth > 540) {
      setMobileMenu(true)
    } else {
      setMobileMenu(false)
    }
  })


  const handleHideMenu = () => {
    if (document.body.clientWidth <= 540) {
      setMobileMenu(false)
    }
  }

  return (
    <>
      <div className="">
        <nav className="h-20 bg-blue-500 flex justify-around items-center px-4 md:0">
          <div className="">
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
          </div>
          <div className='text-white text-xl sm:hidden cursor-pointer'>
            {mobileMenu ? (
              <LiaTimesSolid onClick={() => setMobileMenu(false)} />
            ) : (
              <GiHamburgerMenu onClick={() => setMobileMenu(true)} />
            )}
          </div>
          {mobileMenu && <div className='absolute top-20 z-50 left-0 right-0 bg-blue-500 sm:static select-none'>
            <div className="flex flex-col items-center sm:flex-row pb-4 sm:pb-0">
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
              <div className="flex items-center gap-3 mx-6 my-2 sm:my-0">
                <p
                  className={`text-white ${isActive(
                    'fa'
                  )} cursor-pointer hover:text-black text-xl md:text-2xl`}
                  onClick={() => {handleHideMenu();changeLanguage('fa')}}
                >
                  دری
                </p>
                <span className="text-white">|</span>
                <p
                  className={`text-white ${isActive(
                    'ps'
                  )} cursor-pointer hover:text-black text-xl md:text-2xl`}
                  onClick={() => {handleHideMenu();changeLanguage('ps')}}
                >
                  پشتو
                </p>
              </div>
            </div>
          </div>}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
