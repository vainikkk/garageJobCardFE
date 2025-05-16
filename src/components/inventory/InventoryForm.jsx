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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent } from '../ui/card';

// Define schema for form validation
const inventorySchema = z.object({
  partName: z.string().min(1, { message: 'Part name is required' }),
  partNumber: z.string().optional(),
  category: z.string().optional(),
  stockQuantity: z
    .string()
    .transform(val => parseInt(val, 10))
    .refine(val => !isNaN(val) && val >= 0, {
      message: 'Stock quantity must be a positive number',
    }),
  lowStockThreshold: z
    .string()
    .transform(val => parseInt(val, 10))
    .refine(val => !isNaN(val) && val >= 0, {
      message: 'Threshold must be a positive number',
    }),
  purchasePrice: z
    .string()
    .transform(val => parseFloat(val))
    .refine(val => !isNaN(val) && val >= 0, {
      message: 'Purchase price must be a positive number',
    }),
  sellingPrice: z
    .string()
    .transform(val => parseFloat(val))
    .refine(val => !isNaN(val) && val >= 0, {
      message: 'Selling price must be a positive number',
    }),
  description: z.string().optional(),
  location: z.string().optional(),
});

const InventoryForm = ({ initialData, itemId, onSave }) => {
  const navigate = useNavigate();
  const isEditMode = !!itemId;

  const categories = [
    'Engine Parts',
    'Brakes',
    'Filters',
    'Electrical',
    'Suspension',
    'Fluids & Oils',
    'Body Parts',
    'Interior',
    'Tires & Wheels',
    'Belts & Hoses',
    'Other',
  ];

  // Initialize form with default values or initial data
  const form = useForm({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      partName: initialData?.partName || '',
      partNumber: initialData?.partNumber || '',
      category: initialData?.category || '',
      stockQuantity: initialData?.stockQuantity?.toString() || '0',
      lowStockThreshold: initialData?.lowStockThreshold?.toString() || '5',
      purchasePrice: initialData?.purchasePrice?.toString() || '0',
      sellingPrice: initialData?.sellingPrice?.toString() || '0',
      description: initialData?.description || '',
      location: initialData?.location || '',
    },
  });

  const onSubmit = async data => {
    try {
      // Convert string inputs to proper types
      const processedData = {
        ...data,
        stockQuantity: parseInt(data.stockQuantity.toString()),
        lowStockThreshold: parseInt(data.lowStockThreshold.toString()),
        purchasePrice: parseFloat(data.purchasePrice.toString()),
        sellingPrice: parseFloat(data.sellingPrice.toString()),
      };

      // Generate a unique ID for new items
      const inventoryData = isEditMode
        ? { id: itemId, ...processedData }
        : {
            id: `INV-${Math.floor(Math.random() * 10000)
              .toString()
              .padStart(4, '0')}`,
            ...processedData,
          };

      // Get existing inventory from local storage or initialize empty array
      const existingInventory = JSON.parse(localStorage.getItem('inventory') || '[]');

      if (isEditMode) {
        // Update existing item
        const updatedInventory = existingInventory.map(item => (item.id === itemId ? inventoryData : item));
        localStorage.setItem('inventory', JSON.stringify(updatedInventory));
        toast.success('Inventory item updated successfully');
      } else {
        // Add new item
        existingInventory.push(inventoryData);
        localStorage.setItem('inventory', JSON.stringify(existingInventory));
        toast.success('Inventory item added successfully');
      }

      // Call onSave callback if provided
      if (onSave) {
        onSave(processedData);
      }

      // Navigate back to inventory list
      navigate('/inventory');
    } catch (error) {
      console.error('Error saving inventory data:', error);
      toast.error('Failed to save inventory data');
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
                name='partName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Part Name*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter part name'
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
                name='partNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Part Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter part number'
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
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className='border-garage-neutral/30 focus:border-garage-primary'>
                        <SelectValue placeholder='Select a category' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
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
                name='stockQuantity'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity*</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min={0}
                        placeholder='Enter current stock'
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
                name='lowStockThreshold'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Low Stock Threshold*</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min={0}
                        placeholder='Enter low stock alert threshold'
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
                name='purchasePrice'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purchase Price*</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='0.01'
                        min={0}
                        placeholder='Enter cost price'
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
                name='sellingPrice'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Selling Price*</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='0.01'
                        min={0}
                        placeholder='Enter selling price'
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
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Storage Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='e.g. Shelf A-4, Warehouse 2'
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
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter item description'
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
                onClick={() => navigate('/inventory')}
                className='border-garage-neutral/30'
              >
                Cancel
              </Button>
              <Button type='submit' className='bg-garage-primary hover:bg-garage-primary/90 text-white btn-pulse'>
                <Save className='mr-2 h-4 w-4' />
                {isEditMode ? 'Update Item' : 'Save Item'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default InventoryForm;
