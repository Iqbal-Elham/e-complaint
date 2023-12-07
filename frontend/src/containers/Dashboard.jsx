import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Navigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import useUser from '../context/userUser';
import { FaSpinner } from 'react-icons/fa';

function Dashboard() {
  const { t } = useTranslation();
  const [complaints, setComplaints] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationState, setPaginationState] = useState({
    hasNext: false,
    hasPrev: false,
    count: 0,
  });

  const { user, loading } = useUser();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token && !user) return;
    const route = user?.is_staff ? '' : '/my_complaints';
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }complaints${route}/?limit=${itemsPerPage}&offset=${
          (currentPage - 1) * itemsPerPage
        }`,
        {
          headers: !user?.is_staff ? { Authorization: 'Bearer ' + token } : {},
        }
      )
      .then((response) => {
        setComplaints(response.data.results);
        setPaginationState({
          ...paginationState,
          hasNext: Boolean(response.data.next),
          hasPrev: Boolean(response.data.previous),
          count: response.data.count,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [itemsPerPage, currentPage, loading, user]);

  if (!token) {
    return <Navigate to={'/login'} />;
  }

  if (token && !user) {
    return (
      <div className="mx-auto max-w-screen-2xl overflow-hidden">
        <div className="w-full h-full flex justify-center items-center">
          <FaSpinner color="gray" size={24} className="animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-2xl min-h-[70vh] overflow-hidden">
      <table className="mx-auto w-2/3 my-12 text-xl">
        <thead>
          <tr>
            <th className="text-right border-b border-gray-700 px-2 py-1">
              شماره
            </th>
            <th className="text-right border-b border-gray-700 px-2 py-1">
              نوعیت
            </th>
            <th className="text-right border-b border-gray-700 px-2 py-1">
              شکایت کننده
            </th>
            <th className="text-right border-b border-gray-700 px-2 py-1">
              حالت
            </th>
            <th className="text-right border-b border-gray-700 px-2 py-1">
              عمل
            </th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint?.id} className="border-b">
              <td className="py-2">{complaint?.id}</td>
              <td className="py-2">{t(complaint?.complaint_type)}</td>
              <td className="py-2">{complaint?.name}</td>
              <td className="py-2">{t(`states.${complaint?.state}`)}</td>
              <td className="py-2">
                <Link
                  to={`/complaint/${complaint?.id}`}
                  className="rounded px-2 py-1 bg-blue-500 text-white"
                >
                  نمایش
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-center my-4">
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          setItemsPerPage={setItemsPerPage}
          paginationState={paginationState}
        />
      </div>
    </div>
  );
}

export default Dashboard;
