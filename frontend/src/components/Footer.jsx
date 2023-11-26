import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto max-w-screen-xl flex items-center justify-around 2xl:justify-between">
        <Link
          to="/new"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          {t('newComplaint')}
        </Link>
        <a to="/" rel="home" className="flex items-center justify-center">
          <img src={logo} width="60" height="60" alt="logo" />
          <div className="flex justify-center items-center flex-col mr-2 text-md leading-4 text-white">
            <p className="text-xl">{t('ministry_brand')}</p>
            <p>{t('save_complaint')}</p>
          </div>
        </a>
      </div>
      <div className="container  mx-auto max-w-screen-xl border-t border-white my-4"></div>
      <div className="container mx-auto text-center text-sm">
        Copyright © 2023 | MOI. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
