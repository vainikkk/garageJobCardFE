import { cn } from '../../lib/utils';
import { Car } from 'lucide-react';
import { Link } from 'react-router-dom';

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  'awaiting-payment': 'bg-purple-100 text-purple-800 border-purple-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

const statusLabels = {
  pending: 'Pending',
  'in-progress': 'In Progress',
  completed: 'Completed',
  'awaiting-payment': 'Awaiting Payment',
  cancelled: 'Cancelled',
};

const RecentJobCard = ({ jobCard }) => {
  return (
    <Link
      to={`/job-cards/${jobCard.id}`}
      className='block bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover-scale'
    >
      <div className='flex items-center justify-between mb-2'>
        <div className='flex items-center'>
          <Car className='h-5 w-5 text-garage-primary mr-2' />
          <span className='font-medium text-gray-900'>#{jobCard.id}</span>
        </div>
        <span className={cn('text-xs px-2 py-1 rounded-full', statusStyles[jobCard.status])}>
          {statusLabels[jobCard.status]}
        </span>
      </div>

      <div className='mt-2'>
        <p className='text-sm font-medium text-gray-900'>{jobCard.customerName}</p>
        <p className='text-xs text-gray-500'>
          {jobCard.vehicleMake} {jobCard.vehicleModel} - {jobCard.vehicleReg}
        </p>
        <p className='text-xs text-gray-500 mt-1'>{jobCard.date}</p>
      </div>
    </Link>
  );
};

export default RecentJobCard;
