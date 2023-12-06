import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';

function AuthProvider(props) {
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = ({ username, password }) => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}login/`,
        {
          username,
          password,
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
        console.log(error);
      });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    const { user_id } = jwtDecode(token);
    axios
      .get(`${import.meta.env.VITE_API_URL}users/${user_id}/`, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setLoading(false);
        setUser(response?.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }} {...props} />
  );
}

export default AuthProvider;
