import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { ScrollArea } from '../ui/scroll-area';
import { predefinedServicesData } from './ServiceData';

const PredefinedServicesList = ({ open, onOpenChange, onSelectServices }) => {
  const [selectedServices, setSelectedServices] = useState([]);

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

  const handleConfirm = () => {
    onSelectServices(selectedServices);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setSelectedServices([]);
    onOpenChange(false);
  };

  // Group services by category
  const servicesByCategory = {};
  predefinedServicesData.forEach(service => {
    if (!servicesByCategory[service.category]) {
      servicesByCategory[service.category] = [];
    }
    servicesByCategory[service.category].push(service);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Select Predefined Services</DialogTitle>
        </DialogHeader>

        <ScrollArea className='max-h-[400px] pr-4'>
          <div className='space-y-4 py-2'>
            {Object.entries(servicesByCategory).map(([category, services]) => (
              <div key={category} className='space-y-2'>
                <h3 className='text-sm font-medium text-gray-900'>{category}</h3>
                <div className='space-y-1'>
                  {services.map(service => (
                    <div key={service.id} className='flex items-start space-x-2 rounded-md border p-3 hover:bg-gray-50'>
                      <Checkbox
                        id={service.id}
                        checked={selectedServices.some(s => s.id === service.id)}
                        onCheckedChange={() => handleServiceToggle(service)}
                      />
                      <div className='flex-1'>
                        <Label htmlFor={service.id} className='text-sm font-medium cursor-pointer flex justify-between'>
                          <span>{service.name}</span>
                          <span className='font-semibold'>₹{service.price}</span>
                        </Label>
                        <p className='text-xs text-gray-500 mt-1'>{service.description}</p>
                        <p className='text-xs text-gray-500 mt-0.5'>Est. time: {service.estimatedTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <DialogFooter className='flex justify-between mt-4'>
          <div>
            <p className='text-sm text-gray-500'>
              Selected: <span className='font-medium'>{selectedServices.length} services</span>
            </p>
            <p className='text-sm text-gray-500'>
              Total:{' '}
              <span className='font-medium'>₹{selectedServices.reduce((sum, service) => sum + service.price, 0)}</span>
            </p>
          </div>
          <div className='flex space-x-2'>
            <Button variant='outline' onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Add Services</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PredefinedServicesList;
