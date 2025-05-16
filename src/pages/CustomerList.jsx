import PageLayout from '../components/layout/PageLayout';
import SearchBar from '../components/common/SearchBar';
import { Button } from '../components/ui/button';
import { Plus, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const CustomerList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for customers
  const customers = [
    {
      id: 'CUST-001',
      name: 'John Smith',
      mobile: '+1234567890',
      email: 'john.smith@example.com',
      vehicleCount: 2,
      lastService: 'Jun 22, 2023',
    },
    {
      id: 'CUST-002',
      name: 'Sarah Johnson',
      mobile: '+1987654321',
      email: 'sarah.j@example.com',
      vehicleCount: 1,
      lastService: 'Jun 21, 2023',
    },
    {
      id: 'CUST-003',
      name: 'Michael Brown',
      mobile: '+1122334455',
      email: null,
      vehicleCount: 1,
      lastService: 'Jun 20, 2023',
    },
    {
      id: 'CUST-004',
      name: 'Emily Davis',
      mobile: '+1555666777',
      email: 'emily.davis@example.com',
      vehicleCount: 3,
      lastService: 'Jun 18, 2023',
    },
    {
      id: 'CUST-005',
      name: 'David Wilson',
      mobile: '+1888999000',
      email: 'david.w@example.com',
      vehicleCount: 1,
      lastService: null,
    },
    {
      id: 'CUST-006',
      name: 'Lisa Martinez',
      mobile: '+1777888999',
      email: 'lisa.m@example.com',
      vehicleCount: 2,
      lastService: 'Jun 15, 2023',
    },
    {
      id: 'CUST-007',
      name: 'Robert Taylor',
      mobile: '+1444555666',
      email: 'robert.t@example.com',
      vehicleCount: 1,
      lastService: 'Jun 12, 2023',
    },
    {
      id: 'CUST-008',
      name: 'Jennifer Anderson',
      mobile: '+1222333444',
      email: null,
      vehicleCount: 1,
      lastService: 'Jun 10, 2023',
    },
  ];

  const filteredCustomers = customers.filter(customer =>
    !searchQuery
      ? true
      : customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.mobile.includes(searchQuery) ||
        (customer.email && customer.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSearch = query => {
    setSearchQuery(query);
  };

  return (
    <PageLayout>
      <div className='mb-6'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 mb-1'>Customers</h1>
            <p className='text-gray-500'>Manage customer profiles</p>
          </div>
          <Button asChild className='bg-garage-primary hover:bg-garage-primary/90 btn-pulse'>
            <Link to='/customers/new'>
              <Plus className='mr-2 h-4 w-4' /> Add Customer
            </Link>
          </Button>
        </div>
      </div>

      <div className='mb-6'>
        <SearchBar placeholder='Search customers...' onSearch={handleSearch} className='max-w-xl' />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {filteredCustomers.map(customer => (
          <Link
            key={customer.id}
            to={`/customers/${customer.id}`}
            className='block bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-4 hover-scale'
          >
            <div className='flex items-center mb-3'>
              <div className='bg-garage-light p-2 rounded-full mr-3'>
                <User className='h-5 w-5 text-garage-primary' />
              </div>
              <div>
                <h3 className='font-semibold text-gray-900'>{customer.name}</h3>
                <p className='text-sm text-gray-500'>{customer.id}</p>
              </div>
            </div>

            <div className='space-y-2 mt-4 text-sm'>
              <div className='flex justify-between'>
                <span className='text-gray-500'>Mobile:</span>
                <span className='text-gray-900'>{customer.mobile}</span>
              </div>

              <div className='flex justify-between'>
                <span className='text-gray-500'>Email:</span>
                <span className='text-gray-900'>{customer.email || '-'}</span>
              </div>

              <div className='flex justify-between'>
                <span className='text-gray-500'>Vehicles:</span>
                <span className='text-gray-900'>{customer.vehicleCount}</span>
              </div>

              <div className='flex justify-between'>
                <span className='text-gray-500'>Last Service:</span>
                <span className='text-gray-900'>{customer.lastService || '-'}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className='text-center py-12 bg-white rounded-lg shadow-sm'>
          <User className='h-12 w-12 mx-auto text-gray-300 mb-3' />
          <h3 className='text-lg font-medium text-gray-900 mb-1'>No customers found</h3>
          <p className='text-gray-500 mb-4'>
            {searchQuery ? `No results for "${searchQuery}"` : 'No customers have been added yet'}
          </p>
          <Button asChild className='bg-garage-primary'>
            <Link to='/customers/new'>
              <Plus className='mr-2 h-4 w-4' /> Add Customer
            </Link>
          </Button>
        </div>
      )}
    </PageLayout>
  );
};

export default CustomerList;
