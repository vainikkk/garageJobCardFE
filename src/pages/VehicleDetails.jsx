import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import { Button } from '../components/ui/button';
import { vehicles, customers, jobCards } from '../lib/mockData';
import { Car, ArrowLeft, Calendar, User, Edit, KeyRound, ListChecks, TrendingUp, Settings } from 'lucide-react';
import { format } from 'date-fns';
import ServiceHistory from '../components/vehicle/ServiceHistory';

const VehicleDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [customerName, setCustomerName] = useState('Unknown Customer');

  useEffect(() => {
    // Find the vehicle
    const foundVehicle = vehicles.find(v => v.id === id);
    if (foundVehicle) {
      setVehicle(foundVehicle);

      // Get customer name
      const customer = customers.find(c => c.id === foundVehicle.customerId);
      setCustomerName(customer ? customer.name : 'Unknown Customer');
    }
  }, [id]);

  if (!vehicle) {
    return (
      <PageLayout>
        <div className='text-center py-20'>
          <div className='flex justify-center mb-4'>
            <Car className='h-12 w-12 text-gray-400' />
          </div>
          <h3 className='text-xl font-medium text-gray-900'>Vehicle not found</h3>
          <p className='text-gray-500 mt-2'>The vehicle you're looking for doesn't exist or has been removed.</p>
          <Button variant='outline' className='mt-4' asChild>
            <Link to='/vehicles'>
              <ArrowLeft className='mr-2 h-4 w-4' /> Back to Vehicles
            </Link>
          </Button>
        </div>
      </PageLayout>
    );
  }

  // Mock function to get related job cards
  const getRelatedJobCards = vehicleId => {
    return jobCards.filter(jobCard => jobCard.vehicleId === vehicleId);
  };

  const relatedJobCards = getRelatedJobCards(vehicle.id);

  return (
    <PageLayout>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-6'>
        <div>
          <div className='flex items-center gap-2 mb-2'>
            <Link to='/vehicles' className='text-garage-primary hover:text-garage-primary/80'>
              <ArrowLeft className='h-4 w-4' />
            </Link>
            <h1 className='text-2xl font-bold text-gray-900'>Vehicle Details</h1>
          </div>
          <p className='text-gray-500'>
            {vehicle.make} {vehicle.model} - {vehicle.registrationNumber}
          </p>
        </div>

        <div className='mt-4 md:mt-0 flex items-center gap-3'>
          <Button asChild variant='outline' size='sm'>
            <Link to={`/vehicles/${vehicle.id}/edit`}>
              <Edit className='mr-2 h-4 w-4' /> Edit Vehicle
            </Link>
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          <div className='bg-white rounded-lg shadow p-6'>
            <h3 className='text-lg font-semibold mb-4'>Vehicle Information</h3>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <div>
                <h4 className='text-sm text-gray-500 mb-2'>Customer Information</h4>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <div className='flex items-start mb-3'>
                    <User className='h-5 w-5 mr-2 text-garage-primary' />
                    <div>
                      <p className='font-medium'>{customerName}</p>
                      <Link
                        to={`/customers/${vehicle.customerId}`}
                        className='text-sm text-garage-primary hover:underline'
                      >
                        View Customer Profile
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className='text-sm text-gray-500 mb-2'>Vehicle Details</h4>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <div className='space-y-2'>
                    <div className='flex justify-between'>
                      <span className='text-gray-500 text-sm'>Make & Model:</span>
                      <span className='font-medium'>
                        {vehicle.make} {vehicle.model}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-500 text-sm'>Registration:</span>
                      <span className='font-medium'>{vehicle.registrationNumber}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-500 text-sm'>Year:</span>
                      <span className='font-medium'>{vehicle.year}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-500 text-sm'>Odometer:</span>
                      <span className='font-medium'>{vehicle.lastOdometerReading.toLocaleString()} km</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6'>
              <div>
                <h4 className='text-sm text-gray-500 mb-2'>Engine Number</h4>
                <div className='flex items-center'>
                  <KeyRound className='h-5 w-5 mr-2 text-garage-primary' />
                  <p>{vehicle.engineNumber || 'N/A'}</p>
                </div>
              </div>

              <div>
                <h4 className='text-sm text-gray-500 mb-2'>Chassis Number</h4>
                <div className='flex items-center'>
                  <ListChecks className='h-5 w-5 mr-2 text-garage-primary' />
                  <p>{vehicle.chassisNumber || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className='mt-6'>
              <h4 className='text-sm text-gray-500 mb-2'>Last Service Date</h4>
              <div className='flex items-center'>
                <Calendar className='h-5 w-5 mr-2 text-garage-primary' />
                <p>
                  {relatedJobCards.length > 0
                    ? format(new Date(relatedJobCards[0].dateOfService), 'MMM dd, yyyy')
                    : 'No service history'}
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow p-6 mt-6'>
            <h3 className='text-xl font-semibold mb-6'>Service History</h3>
            <ServiceHistory
              jobCards={relatedJobCards} // This would be filtered from your data
              vehicleReg={vehicle.registrationNumber}
              customerName={customerName} // You'll need to get this from the customer data
            />
          </div>
        </div>

        <div className='lg:col-span-1'>
          <div className='bg-white rounded-lg shadow p-6'>
            <h3 className='text-lg font-semibold mb-4'>Actions</h3>

            <div className='space-y-4'>
              <Button className='w-full flex justify-center items-center'>
                <TrendingUp className='mr-2 h-4 w-4' />
                View Analytics
              </Button>

              <Button className='w-full flex justify-center items-center'>
                <Settings className='mr-2 h-4 w-4' />
                Manage Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default VehicleDetails;
