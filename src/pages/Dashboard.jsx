import PageLayout from '../components/layout/PageLayout';
import StatCard from '../components/dashboard/StatCard';
import QuickAction from '../components/dashboard/QuickAction';
import RecentJobCard from '../components/dashboard/RecentJobCard';
import SearchBar from '../components/common/SearchBar';
import { Car, CheckSquare, FileText, Plus, List, Users, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import LowStockAlert from '../components/inventory/LowStockAlert';
import { formatCurrency } from '../lib/utils';

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data for recent job cards
  const recentJobCards = [
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
  ];

  // Mock inventory items for low stock alerts
  const inventoryItems = [
    {
      id: 'INV-001',
      partName: 'Oil Filter',
      partNumber: 'OF-123',
      category: 'Filters',
      stockQuantity: 2,
      lowStockThreshold: 5,
      purchasePrice: 250,
      sellingPrice: 350,
    },
    {
      id: 'INV-002',
      partName: 'Brake Pads (Front)',
      partNumber: 'BP-456',
      category: 'Brakes',
      stockQuantity: 0,
      lowStockThreshold: 3,
      purchasePrice: 1200,
      sellingPrice: 1800,
    },
    {
      id: 'INV-003',
      partName: 'Air Filter',
      partNumber: 'AF-789',
      category: 'Filters',
      stockQuantity: 4,
      lowStockThreshold: 5,
      purchasePrice: 300,
      sellingPrice: 450,
    },
  ];

  // Mock payment summary data
  const paymentSummary = {
    totalRevenue: 35000,
    pendingPayments: 12500,
    paidToday: 8500,
    pendingJobCards: [
      { id: 'JC-23041', customerName: 'Thomas Wilson', amount: 3200 },
      { id: 'JC-23040', customerName: 'Jessica Brown', amount: 1700 },
      { id: 'JC-23038', customerName: 'Robert Taylor', amount: 2800 },
      { id: 'JC-23037', customerName: 'Linda Miller', amount: 4800 },
    ],
  };

  const handleSearch = query => {
    console.log('Searching for:', query);
    // In a real app, this would search customers, vehicles, and job cards
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <PageLayout>
      <div className='page-section'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6'>
          <div>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-1'>Dashboard</h1>
            <p className='text-gray-500'>Welcome to Garage Service Pro</p>
          </div>
          <SearchBar placeholder='Search customers, vehicles...' onSearch={handleSearch} className='w-full sm:w-72' />
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
        <StatCard
          title='Open Job Cards'
          value='12'
          icon={<FileText className='h-5 w-5 text-white' />}
          trend={5}
          onClick={() => navigate('/job-cards?status=open')}
        />
        <StatCard
          title='Completed Today'
          value='5'
          icon={<CheckSquare className='h-5 w-5 text-white' />}
          trend={-2}
          onClick={() => navigate('/job-cards?status=completed&period=today')}
        />
        <StatCard
          title='Customers'
          value='143'
          icon={<Users className='h-5 w-5 text-white' />}
          onClick={() => navigate('/customers')}
        />
        <StatCard
          title='Low Stock Items'
          value='7'
          subtitle='Requiring attention'
          icon={<List className='h-5 w-5 text-white' />}
          onClick={() => navigate('/inventory?filter=low-stock')}
        />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
        <div className='lg:col-span-2'>
          <Card>
            <CardHeader className='pb-3'>
              <CardTitle className='text-lg flex items-center'>
                <FileText className='h-5 w-5 mr-2 text-garage-primary' />
                Recent Job Cards
                <a href='/job-cards' className='ml-auto text-garage-primary text-sm hover:underline font-medium'>
                  View All
                </a>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {recentJobCards.map(jobCard => (
                  <RecentJobCard key={jobCard.id} jobCard={jobCard} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='lg:col-span-1'>
          <Card className='h-full'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-lg flex items-center'>
                <AlertTriangle className='h-5 w-5 mr-2 text-yellow-500' />
                Inventory Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LowStockAlert items={inventoryItems} />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8'>
        <QuickAction
          icon={<Plus />}
          title='New Job Card'
          to='/job-cards/new'
          colorClass='bg-gradient-to-r from-garage-accent to-garage-accent/90 text-white hover:shadow-md'
        />
        <QuickAction
          icon={<Users />}
          title='Add Customer'
          to='/customers/new'
          colorClass='bg-gradient-to-r from-garage-primary to-garage-primary/90 text-white hover:shadow-md'
        />
        <QuickAction
          icon={<Car />}
          title='Add Vehicle'
          to='/vehicles/new'
          colorClass='bg-gradient-to-r from-garage-primary to-garage-primary/90 text-white hover:shadow-md'
        />
        <QuickAction
          icon={<TrendingUp />}
          title='Reports'
          to='/reports'
          colorClass='bg-gradient-to-r from-gray-100 to-gray-200 text-garage-primary hover:shadow-md'
        />
      </div>

      <div className='mb-8'>
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg flex items-center'>
              <DollarSign className='h-5 w-5 mr-2 text-green-500' />
              Payment Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
              <div className='bg-blue-50 p-4 rounded-md'>
                <p className='text-sm text-blue-600 mb-1'>Monthly Revenue</p>
                <p className='text-2xl font-bold text-blue-800'>{formatCurrency(paymentSummary.totalRevenue)}</p>
              </div>
              <div className='bg-yellow-50 p-4 rounded-md'>
                <p className='text-sm text-yellow-600 mb-1'>Pending Payments</p>
                <p className='text-2xl font-bold text-yellow-800'>{formatCurrency(paymentSummary.pendingPayments)}</p>
              </div>
              <div className='bg-green-50 p-4 rounded-md'>
                <p className='text-sm text-green-600 mb-1'>Paid Today</p>
                <p className='text-2xl font-bold text-green-800'>{formatCurrency(paymentSummary.paidToday)}</p>
              </div>
            </div>

            {paymentSummary.pendingJobCards.length > 0 && (
              <div>
                <h4 className='text-sm font-medium mb-2'>Pending Payment Job Cards</h4>
                <div className='bg-white border rounded-md divide-y'>
                  {paymentSummary.pendingJobCards.map(job => (
                    <div key={job.id} className='p-3 flex justify-between items-center'>
                      <div>
                        <p className='font-medium'>{job.id}</p>
                        <p className='text-sm text-gray-500'>{job.customerName}</p>
                      </div>
                      <div className='font-medium'>{formatCurrency(job.amount)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
