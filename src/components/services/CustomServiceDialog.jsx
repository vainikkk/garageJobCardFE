import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

const CustomServiceDialog = ({ open, onOpenChange, onAddCustomService }) => {
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');

  const handleSubmit = () => {
    if (!serviceName || !serviceDescription || !servicePrice || !estimatedTime) {
      return;
    }

    const customService = {
      id: `custom-${Date.now()}`,
      name: serviceName,
      description: serviceDescription,
      price: Number(servicePrice),
      estimatedTime,
      category: 'Custom Service',
    };

    onAddCustomService(customService);
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setServiceName('');
    setServiceDescription('');
    setServicePrice('');
    setEstimatedTime('');
  };

  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Custom Service</DialogTitle>
        </DialogHeader>

        <div className='space-y-4 py-2'>
          <div className='space-y-2'>
            <Label htmlFor='service-name'>Service Name*</Label>
            <Input
              id='service-name'
              value={serviceName}
              onChange={e => setServiceName(e.target.value)}
              placeholder='Enter service name'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='service-description'>Description*</Label>
            <Textarea
              id='service-description'
              value={serviceDescription}
              onChange={e => setServiceDescription(e.target.value)}
              placeholder='Enter service description'
              rows={3}
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='service-price'>Price (₹)*</Label>
              <Input
                id='service-price'
                value={servicePrice}
                onChange={e => setServicePrice(e.target.value)}
                placeholder='Enter price'
                type='number'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='estimated-time'>Estimated Time*</Label>
              <Input
                id='estimated-time'
                value={estimatedTime}
                onChange={e => setEstimatedTime(e.target.value)}
                placeholder='e.g. 30 min'
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!serviceName || !serviceDescription || !servicePrice || !estimatedTime}
          >
            Add Service
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomServiceDialog;
