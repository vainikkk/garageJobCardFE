import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const ServiceForm = ({ open, onOpenChange, onSubmit, initialData }) => {
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [category, setCategory] = useState('');

  // Predefined categories
  const serviceCategories = [
    'Maintenance',
    'Repair',
    'Complete Service',
    'Advanced Maintenance',
    'Custom Service',
    'Diagnostics',
    'Parts Replacement',
  ];

  // Reset form or populate with initial data when dialog opens/closes
  useEffect(() => {
    if (open) {
      if (initialData) {
        setServiceName(initialData.name);
        setServiceDescription(initialData.description);
        setServicePrice(initialData.price.toString());
        setEstimatedTime(initialData.estimatedTime);
        setCategory(initialData.category);
      } else {
        resetForm();
      }
    }
  }, [open, initialData]);

  const handleSubmit = () => {
    if (!serviceName || !serviceDescription || !servicePrice || !estimatedTime || !category) {
      return;
    }

    const serviceData = {
      id: initialData?.id || `temp-${Date.now()}`,
      name: serviceName,
      description: serviceDescription,
      price: Number(servicePrice),
      estimatedTime,
      category,
    };

    onSubmit(serviceData);
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setServiceName('');
    setServiceDescription('');
    setServicePrice('');
    setEstimatedTime('');
    setCategory('Maintenance');
  };

  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Service' : 'Add New Service'}</DialogTitle>
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

          <div className='space-y-2'>
            <Label htmlFor='category'>Category*</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id='category'>
                <SelectValue placeholder='Select a category' />
              </SelectTrigger>
              <SelectContent>
                {serviceCategories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!serviceName || !serviceDescription || !servicePrice || !estimatedTime || !category}
          >
            {initialData ? 'Update Service' : 'Add Service'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceForm;
