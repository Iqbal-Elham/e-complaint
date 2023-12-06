import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';

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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }complaints/?limit=${itemsPerPage}&offset=${
          (currentPage - 1) * itemsPerPage
        }`
      )
      .then((response) => {
        setComplaints(response.data.results);
        setPaginationState({
          ...paginationState,
          hasNext: Boolean(response.data.next),
          hasPrev: Boolean(response.data.previous),
          count: response.data.count,
        });
        setLoading(false);
      })
      .catch((error) => {
        if (!error.response) {
          setError('connection_error');
        } else {
          setError(error.response?.detail);
        }
        setLoading(false);
      });
  }, [itemsPerPage, currentPage]);

  return (
    <div className="max-w-screen-2xl overflow-hidden">
      <table className="mx-auto w-2/3 my-12">
        <thead>
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
          <th className="text-right border-b border-gray-700 px-2 py-1">عمل</th>
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
      <div className="w-full flex text-center">
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
