import { Navigate } from 'react-router-dom';
import Form from '../components/Form';

const NewComplaint = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className="container mx-auto max-w-screen-xl">
      <Form />
    </div>
  );
};

export default NewComplaint;
