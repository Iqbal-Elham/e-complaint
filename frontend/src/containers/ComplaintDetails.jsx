import { useParams } from 'react-router-dom';
import Complaint from '../components/Complaint';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DetailPlaceholder from '../components/DetailPlaceholder';

const ComplaintDetails = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}complaints/${id}`)
      .then((response) => {
        setComplaint(response.data);
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
  }, [id]);

  return (
    <div className="container mx-auto max-w-screen-xl overflow-hidden">
      {loading || !complaint ? (
        <DetailPlaceholder />
      ) : (
        <Complaint complaint={complaint} />
      )}
    </div>
  );
};

export default ComplaintDetails;
