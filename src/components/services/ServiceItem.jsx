import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';

const ServiceItem = ({ service, onRemove }) => {
  return (
    <div className='flex items-center justify-between border-b pb-3 last:border-b-0'>
      <div className='flex-1'>
        <div className='flex justify-between'>
          <h4 className='text-sm font-medium'>{service.name}</h4>
          <span className='text-sm font-semibold'>₹{service.price}</span>
        </div>
        <p className='text-xs text-gray-500'>{service.description}</p>
        <div className='flex gap-4 mt-1'>
          <span className='text-xs text-gray-500'>Category: {service.category}</span>
          <span className='text-xs text-gray-500'>Est. time: {service.estimatedTime}</span>
        </div>
      </div>
      <Button
        variant='ghost'
        size='sm'
        onClick={() => onRemove(service.id)}
        className='ml-2 text-gray-500 hover:text-destructive'
      >
        <Trash2 className='h-4 w-4' />
      </Button>
    </div>
  );
};

export default ServiceItem;
