
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the dashboard
    navigate('/dashboard');
  }, [navigate]);
  
  // This will only show briefly during the redirect
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-garage-primary">
          Loading Garage Service Pro...
        </h2>
      </div>
    </div>
  );
};

export default Index;
