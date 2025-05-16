import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

const GarageDetails = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState({
    garageName: '',
    phoneNumber: '',
    email: '',
    website: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    ...initialData,
  });

  // Load saved data from localStorage if available
  useEffect(() => {
    const savedData = localStorage.getItem('garageDetails');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Save to localStorage
    localStorage.setItem('garageDetails', JSON.stringify(formData));

    // Call onSave callback if provided
    if (onSave) {
      onSave(formData);
    }

    toast.success('Garage details saved successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className='animate-fade-in'>
      <Card className='shadow-soft'>
        <CardHeader>
          <CardTitle className='text-garage-primary text-xl'>Garage Information</CardTitle>
          <CardDescription>Update your garage details and contact information</CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='garageName' className='text-garage-text'>
                Garage Name
              </Label>
              <Input
                id='garageName'
                name='garageName'
                value={formData.garageName}
                onChange={handleChange}
                placeholder='Enter garage name'
                className='border-garage-neutral/30 focus:border-garage-primary'
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='phoneNumber' className='text-garage-text'>
                Phone Number
              </Label>
              <Input
                id='phoneNumber'
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder='Enter phone number'
                className='border-garage-neutral/30 focus:border-garage-primary'
                required
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='email' className='text-garage-text'>
                Email Address
              </Label>
              <Input
                id='email'
                name='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter email address'
                className='border-garage-neutral/30 focus:border-garage-primary'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='website' className='text-garage-text'>
                Website
              </Label>
              <Input
                id='website'
                name='website'
                value={formData.website}
                onChange={handleChange}
                placeholder='Enter website URL'
                className='border-garage-neutral/30 focus:border-garage-primary'
              />
            </div>
          </div>

          <Separator className='my-4' />

          <div className='space-y-2'>
            <Label htmlFor='address' className='text-garage-text'>
              Street Address
            </Label>
            <Input
              id='address'
              name='address'
              value={formData.address}
              onChange={handleChange}
              placeholder='Enter street address'
              className='border-garage-neutral/30 focus:border-garage-primary'
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='city' className='text-garage-text'>
                City
              </Label>
              <Input
                id='city'
                name='city'
                value={formData.city}
                onChange={handleChange}
                placeholder='City'
                className='border-garage-neutral/30 focus:border-garage-primary'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='state' className='text-garage-text'>
                State/Province
              </Label>
              <Input
                id='state'
                name='state'
                value={formData.state}
                onChange={handleChange}
                placeholder='State'
                className='border-garage-neutral/30 focus:border-garage-primary'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='zipCode' className='text-garage-text'>
                Zip/Postal Code
              </Label>
              <Input
                id='zipCode'
                name='zipCode'
                value={formData.zipCode}
                onChange={handleChange}
                placeholder='Zip Code'
                className='border-garage-neutral/30 focus:border-garage-primary'
              />
            </div>
          </div>

          <div className='pt-4 flex justify-end'>
            <Button type='submit' className='bg-garage-primary hover:bg-garage-primary/90 text-white btn-pulse'>
              <Save className='mr-2 h-4 w-4' /> Save Garage Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default GarageDetails;
