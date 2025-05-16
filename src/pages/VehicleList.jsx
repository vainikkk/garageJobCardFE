import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { vehicles, customers } from '../lib/mockData';
import { Car, Plus, Search, Calendar, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const VehicleList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Enhance vehicle data with customer information
  const enhancedVehicles = vehicles.map(vehicle => {
    const customer = customers.find(c => c.id === vehicle.customerId);
    return {
      ...vehicle,
      customerName: customer ? customer.name : 'Unknown Customer',
    };
  });

  const filteredVehicles = enhancedVehicles.filter(
    vehicle =>
      vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-900 mb-2'>Vehicles</h1>
        <p className='text-gray-500'>View and manage all vehicles in the system</p>
      </div>

      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6'>
        <div className='relative w-full md:w-auto md:min-w-[320px]'>
          <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search by make, model, or reg number...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='pl-10'
          />
        </div>

        <Button asChild>
          <Link to='/vehicles/new'>
            <Plus className='mr-2 h-4 w-4' /> Add Vehicle
          </Link>
        </Button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map(vehicle => (
            <Link
              key={vehicle.id}
              to={`/vehicles/${vehicle.id}`}
              className='bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300 hover-scale'
            >
              <div className='p-6'>
                <div className='flex items-center mb-4'>
                  <div className='bg-garage-light p-2 rounded-full'>
                    <Car className='h-6 w-6 text-garage-primary' />
                  </div>
                  <div className='ml-3'>
                    <h3 className='text-lg font-semibold text-gray-900'>
                      {vehicle.make} {vehicle.model}
                    </h3>
                    <p className='text-sm text-gray-500'>{vehicle.registrationNumber}</p>
                  </div>
                </div>

                <div className='space-y-3'>
                  <div className='flex items-center text-sm'>
                    <UserCircle className='h-4 w-4 mr-2 text-gray-400' />
                    <span className='text-gray-600'>{vehicle.customerName}</span>
                  </div>

                  <div className='flex items-center text-sm'>
                    <Calendar className='h-4 w-4 mr-2 text-gray-400' />
                    <span className='text-gray-600'>{vehicle.year}</span>
                  </div>

                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-500'>
                      Last Odometer: {vehicle.lastOdometerReading.toLocaleString()} km
                    </span>
                    <span className='text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded'>
                      {new Date(vehicle.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className='col-span-full text-center py-10'>
            <div className='flex justify-center mb-4'>
              <Car className='h-12 w-12 text-gray-400' />
            </div>
            <h3 className='text-lg font-medium text-gray-900'>No vehicles found</h3>
            <p className='text-gray-500 mt-2'>Try adjusting your search or add a new vehicle.</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default VehicleList;
