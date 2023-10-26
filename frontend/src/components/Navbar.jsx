import React from "react";
import { useTranslation } from "react-i18next";

const Navbar = () => {

  const { t, i18n } = useTranslation();

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem("selectedLanguage", languageCode);
  };

  return (
    <div className="">
      <nav className="h-12 bg-blue-700 flex justify-center items-center">
        <select
              onChange={(e) => changeLanguage(e.target.value)}
              value={i18n.language}
              className=""
            >
              <option value="fa" className="rounded-none bg-blue-500">
                فارسی
              </option>
              <option value="ps" className="rounded-none bg-blue-500">
                پشتو
              </option>
            </select>
      </nav>
    </div>
  );
};

export default Navbar;
