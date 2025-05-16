import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Card, CardContent } from '../ui/card';

// Define schema for form validation
const customerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  mobile: z.string().min(6, { message: 'Mobile number is required' }),
  email: z.string().email({ message: 'Invalid email address' }).optional().nullable(),
  altContact: z.string().optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
});

const CustomerForm = ({ initialData, customerId, onSave }) => {
  const navigate = useNavigate();
  const isEditMode = !!customerId;

  // Initialize form with default values or initial data
  const form = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      mobile: '',
      email: '',
      altContact: '',
      address: '',
      notes: '',
      ...initialData,
    },
  });

  const onSubmit = async data => {
    try {
      // Generate a unique ID for new customers
      const customerData = isEditMode
        ? { id: customerId, ...data }
        : {
            id: `CUST-${Math.floor(Math.random() * 10000)
              .toString()
              .padStart(4, '0')}`,
            ...data,
          };

      // Get existing customers from local storage or initialize empty array
      const existingCustomers = JSON.parse(localStorage.getItem('customers') || '[]');

      if (isEditMode) {
        // Update existing customer
        const updatedCustomers = existingCustomers.map(customer =>
          customer.id === customerId ? customerData : customer
        );
        localStorage.setItem('customers', JSON.stringify(updatedCustomers));
        toast.success('Customer updated successfully');
      } else {
        // Add new customer
        existingCustomers.push(customerData);
        localStorage.setItem('customers', JSON.stringify(existingCustomers));
        toast.success('Customer added successfully');
      }

      // Call onSave callback if provided
      if (onSave) {
        onSave(data);
      }

      // Navigate back to customers list
      navigate('/customers');
    } catch (error) {
      console.error('Error saving customer data:', error);
      toast.error('Failed to save customer data');
    }
  };

  return (
    <Card className='shadow-sm border border-gray-100'>
      <CardContent className='pt-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter customer name'
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
                name='mobile'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter mobile number'
                        {...field}
                        className='border-garage-neutral/30 focus:border-garage-primary'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='Enter email address'
                        {...field}
                        value={field.value || ''}
                        className='border-garage-neutral/30 focus:border-garage-primary'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='altContact'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alternative Contact</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter alternative contact'
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
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter customer address'
                      {...field}
                      className='resize-none min-h-[100px] border-garage-neutral/30 focus:border-garage-primary'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='notes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Add any additional notes'
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
                onClick={() => navigate('/customers')}
                className='border-garage-neutral/30'
              >
                Cancel
              </Button>
              <Button type='submit' className='bg-garage-primary hover:bg-garage-primary/90 text-white btn-pulse'>
                <Save className='mr-2 h-4 w-4' />
                {isEditMode ? 'Update Customer' : 'Save Customer'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CustomerForm;
