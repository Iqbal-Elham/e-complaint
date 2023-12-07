import { Link } from 'react-router-dom';
import CarouselSlider from '../components/CarouselSlider';
import Card from '../components/Card';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PlaceHolder from '../components/Placeholder';
import ReactPlayer from 'react-player';
import Pagination from '../components/Pagination';

const Homepage = () => {
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
    <div>
      <CarouselSlider />
      <div className="container mx-auto max-w-screen-xl">
        <div className="mt-16">
          <Link to="/new">
            <button className="flex items-center justify-center rounded-md p-2 w-52 text-xl bg-blue-500 font-bold text-white hover:bg-blue-700 m-3">
              <span>{t('newComplaint')}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </Link>
          <h2 className="text-center py-2 mx-4 2xl:mx-0 mb-10 text-5xl rounded-md bg-blue-100 border-y-2 border-y-gray-800">
            شکایات
          </h2>
          {complaints.length > 0 ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 place-items-center gap-4 mt-6">
              {loading ? (
                <>
                  <PlaceHolder />
                  <PlaceHolder />
                  <PlaceHolder />
                </>
              ) : (
                complaints.map((complaint) => (
                  <Card key={complaint.id} complaint={complaint} />
                ))
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center text-4xl p-10">
              <p>{t('no_complaint_exist')}</p>
            </div>
          )}
          <div className="my-8">
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              setCurrentPage={setCurrentPage}
              setItemsPerPage={setItemsPerPage}
              paginationState={paginationState}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
