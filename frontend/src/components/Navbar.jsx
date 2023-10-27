import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [activeLanguage, setActiveLanguage] = useState(i18n.language);

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem("selectedLanguage", languageCode);
  };

  useEffect(() => {
    setActiveLanguage(i18n.language);
  }, [i18n.language]);

  const isActive = (language) => {
    return activeLanguage === language ? "text-white" : "text-black";
  };

  return (
    <>
    <div className="">
      <nav className="h-20 bg-blue-500 flex justify-around items-center">
        <div className="">
          <Link to="/" rel="home" className="flex items-center justify-center">
            <img
              src={logo}
              width="60"
              height="60"
              alt="logo"
            />
            <div className="flex justify-center items-center flex-col mr-2 text-md leading-4 text-white">
              <p className="text-xl">{t('ministry_brand')}</p>
              <p>{t('save_complaint')}</p>
            </div>
          </Link>
        </div>
        <div>
          <div className="flex items-center gap-3">
            <p
              className={`text-white ${isActive("fa")} cursor-pointer hover:text-black text-2xl`}
              onClick={() => changeLanguage("fa")}
            >
              دری
            </p>
            <span className="text-white">|</span>
            <p
              className={`text-white ${isActive("ps")} cursor-pointer hover:text-black text-2xl`}
              onClick={() => changeLanguage("ps")}
            >
              پشتو
            </p>
          </div>
        </div>
      </nav>
    </div>
    </>
  );
};

export default Navbar;
