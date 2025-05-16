import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent } from '../ui/card';

// Define schema for form validation
const vehicleSchema = z.object({
  customerId: z.string().min(1, { message: 'Customer is required' }),
  make: z.string().min(1, { message: 'Make is required' }),
  model: z.string().min(1, { message: 'Model is required' }),
  year: z.string().regex(/^\d{4}$/, { message: 'Year must be 4 digits' }),
  registrationNumber: z.string().min(1, { message: 'Registration number is required' }),
  engineNumber: z.string().optional(),
  chassisNumber: z.string().optional(),
  odometerReading: z.string().optional(),
  fuelType: z.string().optional(),
  notes: z.string().optional(),
});

const VehicleForm = ({ initialData, vehicleId, onSave, preselectedCustomerId }) => {
  const navigate = useNavigate();
  const isEditMode = !!vehicleId;
  const [customers, setCustomers] = useState([]);

  // Load customers from localStorage
  useEffect(() => {
    const loadedCustomers = JSON.parse(localStorage.getItem('customers') || '[]');
    setCustomers(loadedCustomers);
  }, []);

  // Initialize form with default values or initial data
  const form = useForm({
    // resolver: zodResolver(vehicleSchema),
    defaultValues: {
      customerId: preselectedCustomerId || '',
      make: '',
      model: '',
      year: new Date().getFullYear().toString(),
      registrationNumber: '',
      engineNumber: '',
      chassisNumber: '',
      odometerReading: '',
      fuelType: '',
      notes: '',
      ...initialData,
    },
  });

  const onSubmit = async data => {
    try {
      // Generate a unique ID for new vehicles
      const vehicleData = isEditMode
        ? { id: vehicleId, ...data }
        : {
            id: `VEH-${Math.floor(Math.random() * 10000)
              .toString()
              .padStart(4, '0')}`,
            ...data,
          };

      // Get existing vehicles from local storage or initialize empty array
      const existingVehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');

      if (isEditMode) {
        // Update existing vehicle
        const updatedVehicles = existingVehicles.map(vehicle => (vehicle.id === vehicleId ? vehicleData : vehicle));
        localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
        toast.success('Vehicle updated successfully');
      } else {
        // Add new vehicle
        existingVehicles.push(vehicleData);
        localStorage.setItem('vehicles', JSON.stringify(existingVehicles));
        toast.success('Vehicle added successfully');
      }

      // Call onSave callback if provided
      if (onSave) {
        onSave(data);
      }

      // Navigate back to vehicles list or to the customer's details
      if (preselectedCustomerId) {
        navigate(`/customers/${preselectedCustomerId}`);
      } else {
        navigate('/vehicles');
      }
    } catch (error) {
      console.error('Error saving vehicle data:', error);
      toast.error('Failed to save vehicle data');
    }
  };

  return (
    <Card className='shadow-sm border border-gray-100'>
      <CardContent className='pt-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='customerId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer*</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!!preselectedCustomerId}>
                    <FormControl>
                      <SelectTrigger className='border-garage-neutral/30 focus:border-garage-primary'>
                        <SelectValue placeholder='Select a customer' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {customers.map(customer => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name} ({customer.mobile})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormField
                control={form.control}
                name='make'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Make*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='e.g. Toyota'
                        {...field}
                        className='border-garage-neutral/30 focus:border-garage-primary'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='model'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='e.g. Corolla'
                        {...field}
                        className='border-garage-neutral/30 focus:border-garage-primary'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <FormField
                control={form.control}
                name='year'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='e.g. 2023'
                        {...field}
                        className='border-garage-neutral/30 focus:border-garage-primary'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='registrationNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Number*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='e.g. ABC-123'
                        {...field}
                        className='border-garage-neutral/30 focus:border-garage-primary'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='fuelType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fuel Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='border-garage-neutral/30 focus:border-garage-primary'>
                          <SelectValue placeholder='Select fuel type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='petrol'>Petrol</SelectItem>
                        <SelectItem value='diesel'>Diesel</SelectItem>
                        <SelectItem value='electric'>Electric</SelectItem>
                        <SelectItem value='hybrid'>Hybrid</SelectItem>
                        <SelectItem value='lpg'>LPG</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <FormField
                control={form.control}
                name='engineNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Engine Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter engine number'
                        {...field}
                        className='border-garage-neutral/30 focus:border-garage-primary'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='chassisNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chassis Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter chassis number'
                        {...field}
                        className='border-garage-neutral/30 focus:border-garage-primary'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='odometerReading'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Odometer Reading (km)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='e.g. 45000'
                        {...field}
                        className='border-garage-neutral/30 focus:border-garage-primary'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='notes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Add any additional notes about the vehicle'
                      {...field}
                      className='resize-none min-h-[100px] border-garage-neutral/30 focus:border-garage-primary'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end gap-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() =>
                  preselectedCustomerId ? navigate(`/customers/${preselectedCustomerId}`) : navigate('/vehicles')
                }
                className='border-garage-neutral/30'
              >
                Cancel
              </Button>
              <Button type='submit' className='bg-garage-primary hover:bg-garage-primary/90 text-white btn-pulse'>
                <Save className='mr-2 h-4 w-4' />
                {isEditMode ? 'Update Vehicle' : 'Save Vehicle'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VehicleForm;
