import PageLayout from '../components/layout/PageLayout';
import VehicleForm from '../components/vehicle/VehicleForm';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const VehicleNew = () => {
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get('customerId');

  return (
    <PageLayout>
      <div className='mb-6'>
        <div className='flex items-center gap-2 mb-2'>
          <Link
            to={customerId ? `/customers/${customerId}` : '/vehicles'}
            className='text-garage-primary hover:text-garage-primary/80'
          >
            <ArrowLeft className='h-4 w-4' />
          </Link>
          <h1 className='text-2xl font-bold text-gray-900'>Add New Vehicle</h1>
        </div>
        <p className='text-gray-500 mb-6'>
          Create a new vehicle record in the system{customerId ? ' for the selected customer' : ''}.
        </p>

        <VehicleForm preselectedCustomerId={customerId || undefined} />
      </div>
    </PageLayout>
  );
};

export default VehicleNew;
