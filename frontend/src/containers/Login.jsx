import Logo from '../assets/logo.png';
import { Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useUser from '../context/userUser';
const LoginPage = () => {
  const { t } = useTranslation();

  const { login } = useUser();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    login({
      username: formData.get('username'),
      password: formData.get('password'),
    });
  };

  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex items-center justify-center">
            <img width={80} height={80} src={Logo} alt="logo" />
          </div>
          <h2 className="w-full text-3xl font-bold my-4 text-gray-700 text-center">
            به سیستم وارد شوید
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              نام کاربری
            </label>
            <input
              className="placeholder:text-right shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="username"
              name="username"
              placeholder="نام کاربری خودرا وارد کنید"
              dir="ltr"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              رمز عبور
            </label>
            <input
              className="placeholder:text-right shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              placeholder="رمز عبور خودرا وارد کنید"
              dir="ltr"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              وارد شوید
            </button>
            <Link
              to="/register"
              className="text-blue-500 cursor-pointer hover:text-black text-xl md:text-2xl mx-4 my-2 sm:my-0"
            >
              <p>{t('register')}</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
