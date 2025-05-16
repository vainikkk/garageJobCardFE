import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import { Button } from '../components/ui/button';
import { customers, vehicles, jobCards } from '../../lib/mockData';
import { User, ArrowLeft, Edit, Phone, Mail, MapPin, Car, Calendar, Plus } from 'lucide-react';

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [customerVehicles, setCustomerVehicles] = useState([]);
  const [jobCardCount, setJobCardCount] = useState(0);

  useEffect(() => {
    const foundCustomer = customers.find(c => c.id === id);
    if (foundCustomer) {
      setCustomer(foundCustomer);

      // Get customer vehicles
      const custVehicles = vehicles.filter(v => v.customerId === id);
      setCustomerVehicles(custVehicles);

      // Get job card count
      const custJobCards = jobCards.filter(job => job.customerId === id);
      setJobCardCount(custJobCards.length);
    }
  }, [id]);

  if (!customer) {
    return (
      <PageLayout>
        <div className='text-center py-20'>
          <div className='flex justify-center mb-4'>
            <User className='h-12 w-12 text-gray-400' />
          </div>
          <h3 className='text-xl font-medium text-gray-900'>Customer not found</h3>
          <p className='text-gray-500 mt-2'>The customer you're looking for doesn't exist or has been removed.</p>
          <Button variant='outline' className='mt-4' asChild>
            <Link to='/customers'>
              <ArrowLeft className='mr-2 h-4 w-4' /> Back to Customers
            </Link>
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-6'>
        <div>
          <div className='flex items-center gap-2 mb-2'>
            <Link to='/customers' className='text-garage-primary hover:text-garage-primary/80'>
              <ArrowLeft className='h-4 w-4' />
            </Link>
            <h1 className='text-2xl font-bold text-gray-900'>Customer Profile</h1>
          </div>
          <p className='text-gray-500'>{customer.name}</p>
        </div>

        <div className='mt-4 md:mt-0 flex flex-wrap gap-2'>
          <Button variant='outline'>
            <Edit className='mr-2 h-4 w-4' /> Edit Profile
          </Button>
          <Button asChild>
            <Link to='/vehicles/new'>
              <Car className='mr-2 h-4 w-4' /> Add Vehicle
            </Link>
          </Button>
          <Button asChild>
            <Link to='/job-cards/new'>
              <Plus className='mr-2 h-4 w-4' /> New Job Card
            </Link>
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-1'>
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center mb-6'>
              <div className='bg-garage-light p-3 rounded-full'>
                <User className='h-8 w-8 text-garage-primary' />
              </div>
              <div className='ml-4'>
                <h2 className='text-xl font-semibold text-gray-900'>{customer.name}</h2>
                <p className='text-gray-500'>Customer since {new Date(customer.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className='space-y-4'>
              <div>
                <p className='text-sm text-gray-500'>Contact Information</p>
                <div className='mt-1 space-y-2'>
                  <div className='flex items-center'>
                    <Phone className='h-4 w-4 mr-2 text-garage-primary' />
                    <a href={`tel:${customer.mobileNumber}`} className='text-garage-primary hover:underline'>
                      {customer.mobileNumber}
                    </a>
                  </div>

                  {customer.alternateContactNumber && (
                    <div className='flex items-center'>
                      <Phone className='h-4 w-4 mr-2 text-garage-primary' />
                      <a
                        href={`tel:${customer.alternateContactNumber}`}
                        className='text-garage-primary hover:underline'
                      >
                        {customer.alternateContactNumber} (Alt)
                      </a>
                    </div>
                  )}

                  {customer.email && (
                    <div className='flex items-center'>
                      <Mail className='h-4 w-4 mr-2 text-garage-primary' />
                      <a href={`mailto:${customer.email}`} className='text-garage-primary hover:underline'>
                        {customer.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <p className='text-sm text-gray-500'>Address</p>
                <div className='flex items-start mt-1'>
                  <MapPin className='h-4 w-4 mr-2 mt-1 text-garage-primary' />
                  <p>{customer.address}</p>
                </div>
              </div>

              <div>
                <p className='text-sm text-gray-500'>Service Summary</p>
                <div className='bg-garage-light rounded-md p-3 mt-1'>
                  <div className='flex justify-between items-center'>
                    <span>Total Vehicles</span>
                    <span className='font-semibold'>{customerVehicles.length}</span>
                  </div>
                  <div className='flex justify-between items-center mt-2'>
                    <span>Job Cards</span>
                    <span className='font-semibold'>{jobCardCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='lg:col-span-2'>
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex justify-between items-center mb-6'>
              <h3 className='text-lg font-semibold flex items-center'>
                <Car className='h-5 w-5 mr-2 text-garage-primary' />
                Vehicles
              </h3>
              <Button variant='outline' size='sm' asChild>
                <Link to='/vehicles/new'>
                  <Plus className='mr-2 h-4 w-4' /> Add Vehicle
                </Link>
              </Button>
            </div>

            {customerVehicles.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {customerVehicles.map(vehicle => (
                  <Link
                    key={vehicle.id}
                    to={`/vehicles/${vehicle.id}`}
                    className='block border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow duration-300 hover-scale'
                  >
                    <div className='flex items-center mb-3'>
                      <Car className='h-5 w-5 mr-2 text-garage-primary' />
                      <h4 className='font-medium text-gray-900'>
                        {vehicle.make} {vehicle.model}
                      </h4>
                    </div>

                    <div className='space-y-2 text-sm'>
                      <div className='flex justify-between'>
                        <span className='text-gray-500'>Registration</span>
                        <span className='font-medium'>{vehicle.registrationNumber}</span>
                      </div>

                      <div className='flex justify-between'>
                        <span className='text-gray-500'>Year</span>
                        <span className='flex items-center'>
                          <Calendar className='h-3 w-3 mr-1' /> {vehicle.year}
                        </span>
                      </div>

                      <div className='flex justify-between'>
                        <span className='text-gray-500'>Last Odometer</span>
                        <span>{vehicle.lastOdometerReading.toLocaleString()} km</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className='text-center py-10 border border-dashed rounded-lg'>
                <Car className='h-12 w-12 mx-auto text-gray-400' />
                <h4 className='mt-2 text-lg font-medium text-gray-900'>No vehicles yet</h4>
                <p className='text-gray-500 mt-1 mb-4'>This customer doesn't have any vehicles on record.</p>
                <Button asChild>
                  <Link to='/vehicles/new'>
                    <Car className='mr-2 h-4 w-4' /> Add Vehicle
                  </Link>
                </Button>
              </div>
            )}
          </div>

          <div className='bg-white rounded-lg shadow p-6 mt-6'>
            <div className='flex justify-between items-center mb-6'>
              <h3 className='text-lg font-semibold'>Recent Service History</h3>
              <Button variant='link' size='sm' asChild>
                <Link to={`/job-cards?customerId=${customer.id}`}>View All</Link>
              </Button>
            </div>

            {jobCardCount > 0 ? (
              <div className='space-y-2'>
                {/* Here you would render recent job cards */}
                <p className='text-center text-gray-500 py-4'>Recent service history will be displayed here.</p>
              </div>
            ) : (
              <div className='text-center py-6 border border-dashed rounded-lg'>
                <p className='text-gray-500'>This customer has no service history yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CustomerDetails;
