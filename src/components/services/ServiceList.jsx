import { useState } from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { useToast } from '../../hooks/use-toast';

const ServiceList = ({ services, onEdit, onDelete, selectable = false, onSelectServices }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const { toast } = useToast();

  const handleServiceToggle = service => {
    setSelectedServices(prev => {
      const isAlreadySelected = prev.some(s => s.id === service.id);

      if (isAlreadySelected) {
        return prev.filter(s => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const handleAddSelectedServices = () => {
    if (onSelectServices && selectedServices.length > 0) {
      onSelectServices(selectedServices);
      setSelectedServices([]);

      toast({
        title: 'Services Selected',
        description: `${selectedServices.length} services added to job card`,
      });
    } else if (selectedServices.length === 0) {
      toast({
        title: 'No Services Selected',
        description: 'Please select at least one service',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='space-y-4'>
      {selectable && (
        <div className='flex justify-end mb-2'>
          <Button
            onClick={handleAddSelectedServices}
            disabled={selectedServices.length === 0}
            className='bg-garage-primary hover:bg-garage-primary/90'
          >
            <Plus className='h-4 w-4 mr-2' />
            Add Selected Services ({selectedServices.length})
          </Button>
        </div>
      )}

      {services.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {services.map(service => (
            <div key={service.id} className='border rounded-md p-4 hover:bg-gray-50 transition-colors'>
              <div className='flex justify-between mb-2'>
                {selectable && (
                  <div className='flex items-center gap-2'>
                    <Checkbox
                      checked={selectedServices.some(s => s.id === service.id)}
                      onCheckedChange={() => handleServiceToggle(service)}
                      id={`service-${service.id}`}
                    />
                    <label htmlFor={`service-${service.id}`} className='font-medium cursor-pointer'>
                      {service.name}
                    </label>
                  </div>
                )}
                {!selectable && <h3 className='font-medium'>{service.name}</h3>}
                <span className='font-semibold'>₹{service.price}</span>
              </div>

              <p className='text-sm text-gray-500 mb-2'>{service.description}</p>

              <div className='flex items-center justify-between'>
                <div className='flex gap-3 text-xs text-gray-500'>
                  <span>Category: {service.category}</span>
                  <span>Est. time: {service.estimatedTime}</span>
                </div>

                <div className='flex space-x-2'>
                  <Button variant='ghost' size='sm' onClick={() => onEdit(service)}>
                    <Edit className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='hover:text-destructive'
                    onClick={() => onDelete(service.id)}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center py-8'>
          <p className='text-gray-500'>No services found</p>
        </div>
      )}
    </div>
  );
};

export default ServiceList;
