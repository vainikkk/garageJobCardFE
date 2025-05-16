import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog';
import { Package, Plus, Search, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const InventoryList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [inventoryItems, setInventoryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [showLowStock, setShowLowStock] = useState(false);

  // Load inventory items from localStorage
  useEffect(() => {
    const storedInventory = localStorage.getItem('inventory');
    if (storedInventory) {
      const parsedInventory = JSON.parse(storedInventory);
      setInventoryItems(parsedInventory);
    }
  }, []);

  // Get unique categories from inventory items
  const categories = Array.from(new Set(inventoryItems.map(item => item.category || 'Uncategorized')));

  // Filter inventory items based on search query, category, and low stock filter
  useEffect(() => {
    let results = [...inventoryItems];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        item =>
          item.partName.toLowerCase().includes(query) ||
          (item.partNumber && item.partNumber.toLowerCase().includes(query))
      );
    }

    if (categoryFilter) {
      results = results.filter(item =>
        categoryFilter === 'Uncategorized' ? !item.category : item.category === categoryFilter
      );
    }

    if (showLowStock) {
      results = results.filter(item => item.stockQuantity <= item.lowStockThreshold);
    }

    setFilteredItems(results);
  }, [searchQuery, categoryFilter, showLowStock, inventoryItems]);

  const handleAddInventoryItem = () => {
    navigate('/inventory/new');
  };

  const handleDeleteItem = itemId => {
    try {
      // Filter out the item with the given id
      const updatedInventory = inventoryItems.filter(item => item.id !== itemId);

      // Update localStorage
      localStorage.setItem('inventory', JSON.stringify(updatedInventory));

      // Update state
      setInventoryItems(updatedInventory);

      toast.success('Inventory item deleted successfully');
    } catch (error) {
      console.error('Error deleting inventory item:', error);
      toast.error('Failed to delete inventory item');
    }
  };

  return (
    <PageLayout>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-900 mb-2'>Inventory Management</h1>
        <p className='text-gray-500'>Manage parts inventory and track stock levels</p>
      </div>

      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6'>
        <div className='relative w-full md:w-auto md:min-w-[320px]'>
          <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search by part name or number...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='pl-10'
          />
        </div>

        <div className='flex flex-wrap gap-2 items-center'>
          <select
            className='bg-background border border-input rounded-md px-3 py-2 text-sm'
            value={categoryFilter || ''}
            onChange={e => setCategoryFilter(e.target.value || null)}
          >
            <option value=''>All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              id='lowStockFilter'
              checked={showLowStock}
              onChange={() => setShowLowStock(!showLowStock)}
              className='rounded border-gray-300'
            />
            <label htmlFor='lowStockFilter' className='text-sm'>
              Low Stock Only
            </label>
          </div>

          <Button onClick={handleAddInventoryItem}>
            <Plus className='mr-2 h-4 w-4' /> Add Item
          </Button>
        </div>
      </div>

      <div className='bg-white shadow rounded-lg overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Part Name
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Part Number
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Category
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Stock
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Price
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <tr key={item.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center'>
                          <Package className='h-5 w-5 text-garage-primary' />
                        </div>
                        <div className='ml-4'>
                          <div className='text-sm font-medium text-gray-900'>{item.partName}</div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-500'>{item.partNumber || '—'}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-500'>{item.category || 'Uncategorized'}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div
                        className={`text-sm font-medium ${
                          item.stockQuantity <= item.lowStockThreshold ? 'text-garage-danger' : 'text-gray-900'
                        }`}
                      >
                        {item.stockQuantity} {item.stockQuantity <= item.lowStockThreshold && '(Low)'}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>${item.sellingPrice.toFixed(2)}</div>
                      <div className='text-xs text-gray-500'>Cost: ${item.purchasePrice.toFixed(2)}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-garage-primary'>
                      <div className='flex gap-2'>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='h-8 w-8 p-0'
                          onClick={() => navigate(`/inventory/edit/${item.id}`)}
                        >
                          <Edit className='h-4 w-4' />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant='ghost' size='sm' className='h-8 w-8 p-0 text-garage-danger'>
                              <Trash2 className='h-4 w-4' />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Inventory Item</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{item.partName}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteItem(item.id)}
                                className='bg-garage-danger hover:bg-garage-danger/90'
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className='px-6 py-4 text-center text-sm text-gray-500'>
                    {searchQuery || categoryFilter || showLowStock
                      ? 'No inventory items match your filters'
                      : 'No inventory items found. Add your first item to get started.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {filteredItems.length === 0 && inventoryItems.length === 0 && (
        <div className='flex justify-center mt-8'>
          <Button onClick={handleAddInventoryItem} className='bg-garage-primary'>
            <Plus className='mr-2 h-4 w-4' /> Add Your First Inventory Item
          </Button>
        </div>
      )}
    </PageLayout>
  );
};

export default InventoryList;
