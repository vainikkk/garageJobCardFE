import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import SearchBar from '../components/common/SearchBar';
import { Button } from '../components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn, getStatusColor, getStatusLabel } from 'lib/utils';

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  'awaiting-payment': 'bg-purple-100 text-purple-800 border-purple-200',
};

const statusLabels = {
  pending: 'Pending',
  'in-progress': 'In Progress',
  completed: 'Completed',
  'awaiting-payment': 'Awaiting Payment',
};

const JobCardList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);

  // Mock data for job cards
  const jobCards = [
    {
      id: 'JC-23045',
      customerName: 'John Smith',
      vehicleMake: 'Toyota',
      vehicleModel: 'Corolla',
      vehicleReg: 'ABC 123',
      status: 'in-progress',
      date: 'Today, 09:30 AM',
    },
    {
      id: 'JC-23044',
      customerName: 'Sarah Johnson',
      vehicleMake: 'Honda',
      vehicleModel: 'Civic',
      vehicleReg: 'XYZ 789',
      status: 'completed',
      date: 'Yesterday, 2:15 PM',
    },
    {
      id: 'JC-23043',
      customerName: 'Michael Brown',
      vehicleMake: 'Ford',
      vehicleModel: 'Focus',
      vehicleReg: 'DEF 456',
      status: 'awaiting-payment',
      date: 'Yesterday, 11:00 AM',
    },
    {
      id: 'JC-23042',
      customerName: 'Emily Davis',
      vehicleMake: 'Nissan',
      vehicleModel: 'Altima',
      vehicleReg: 'GHI 789',
      status: 'pending',
      date: 'Jun 20, 10:45 AM',
    },
    {
      id: 'JC-23041',
      customerName: 'David Wilson',
      vehicleMake: 'BMW',
      vehicleModel: '3 Series',
      vehicleReg: 'JKL 012',
      status: 'completed',
      date: 'Jun 19, 3:20 PM',
    },
    {
      id: 'JC-23040',
      customerName: 'Lisa Martinez',
      vehicleMake: 'Mercedes',
      vehicleModel: 'C-Class',
      vehicleReg: 'MNO 345',
      status: 'pending',
      date: 'Jun 19, 9:15 AM',
    },
    {
      id: 'JC-23039',
      customerName: 'Robert Taylor',
      vehicleMake: 'Audi',
      vehicleModel: 'A4',
      vehicleReg: 'PQR 678',
      status: 'in-progress',
      date: 'Jun 18, 1:45 PM',
    },
    {
      id: 'JC-23038',
      customerName: 'Jennifer Anderson',
      vehicleMake: 'Volkswagen',
      vehicleModel: 'Golf',
      vehicleReg: 'STU 901',
      status: 'completed',
      date: 'Jun 18, 10:30 AM',
    },
  ];

  const filteredJobCards = jobCards.filter(jobCard => {
    const matchesSearch =
      !searchQuery ||
      jobCard.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jobCard.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jobCard.vehicleReg.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${jobCard.vehicleMake} ${jobCard.vehicleModel}`.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = !statusFilter || jobCard.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleSearch = query => {
    setSearchQuery(query);
  };

  return (
    <PageLayout>
      <div className='mb-6'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 mb-1'>Job Cards</h1>
            <p className='text-gray-500'>Manage all job cards</p>
          </div>
          <Button asChild className='bg-gradient-primary hover:opacity-90 text-white btn-pulse'>
            <Link to='/job-cards/new'>
              <Plus className='mr-2 h-4 w-4' /> New Job Card
            </Link>
          </Button>
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-4 mb-6'>
        <SearchBar placeholder='Search job cards...' onSearch={handleSearch} className='flex-grow' />

        <div className='flex gap-2 overflow-x-auto pb-2'>
          <Button
            variant={statusFilter === null ? 'default' : 'outline'}
            className={statusFilter === null ? 'bg-garage-primary' : ''}
            onClick={() => setStatusFilter(null)}
          >
            All
          </Button>
          <Button
            variant={statusFilter === 'pending' ? 'default' : 'outline'}
            className={statusFilter === 'pending' ? 'bg-garage-warning text-gray-800' : ''}
            onClick={() => setStatusFilter('pending')}
          >
            Pending
          </Button>
          <Button
            variant={statusFilter === 'in-progress' ? 'default' : 'outline'}
            className={statusFilter === 'in-progress' ? 'bg-garage-primary' : ''}
            onClick={() => setStatusFilter('in-progress')}
          >
            In Progress
          </Button>
          <Button
            variant={statusFilter === 'completed' ? 'default' : 'outline'}
            className={statusFilter === 'completed' ? 'bg-garage-accent text-white' : ''}
            onClick={() => setStatusFilter('completed')}
          >
            Completed
          </Button>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow-md overflow-hidden border border-gray-100'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Job Card ID
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Customer
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Vehicle
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {filteredJobCards.map(jobCard => (
                <tr key={jobCard.id} className='hover:bg-blue-50 transition-colors'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <Link to={`/job-cards/${jobCard.id}`} className='font-medium text-garage-primary hover:underline'>
                      {jobCard.id}
                    </Link>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>{jobCard.customerName}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {jobCard.vehicleMake} {jobCard.vehicleModel} - {jobCard.vehicleReg}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{jobCard.date}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={cn(
                        'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                        getStatusColor(jobCard.status)
                      )}
                    >
                      {getStatusLabel(jobCard.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredJobCards.length === 0 && (
          <div className='p-8 text-center'>
            <p className='text-gray-500'>No job cards found.</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default JobCardList;
