import Logo from '../assets/logo.png';
import axios from 'axios';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [erros, setErrors] = useState({});
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);

    axios
      .post(
        `${import.meta.env.VITE_API_URL}users/`,
        {
          email: formData.get('email'),
          username: formData.get('username'),
          password: formData.get('password'),
          first_name: formData.get('first_name'),
          last_name: formData.get('last_name'),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        localStorage.setItem('token', response.data?.token);
        navigate('/');
      })
      .catch((error) => {
        if (error.response.status === 400) {
          Object.entries(error.response?.data).map(([key]) => {
            toast.error(t(`${key}-error`));
          });
        }
      });
  };

  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className="flex items-center justify-center py-8 min-h-screen bg-gray-100">
      <div className="w-full max-w-xs md:max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex items-center justify-center">
            <img width={80} height={80} src={Logo} alt="logo" />
          </div>
          <h2 className="w-full text-3xl font-bold my-4 text-gray-700 text-center">
            {t('register-title')}
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              {t('username')}
            </label>
            <input
              className="placeholder:text-right shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="username"
              name="username"
              placeholder={t('username-placeholder')}
              dir="ltr"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              {t('password')}
            </label>
            <input
              className="placeholder:text-right shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              placeholder={t('password-placeholder')}
              type="password"
              name="password"
              dir="ltr"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="first_name"
            >
              {t('name')}
            </label>
            <input
              className="placeholder:text-right shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="first_name"
              type="first_name"
              name="first_name"
              placeholder={t('first_name-placeholder')}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="last_name"
            >
              {t('last_name')}
            </label>
            <input
              className="placeholder:text-right shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="last_name"
              type="last_name"
              name="last_name"
              placeholder={t('last_name-placeholder')}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              {t('email')}
            </label>
            <input
              className="placeholder:text-right shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder={t('email-placeholder')}
              dir="ltr"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              {t('register')}
            </button>
            <Link
              to="/login"
              className="text-blue-500 cursor-pointer hover:text-black text-xl md:text-2xl mx-4 my-2 sm:my-0"
            >
              <p>{t('login')}</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
