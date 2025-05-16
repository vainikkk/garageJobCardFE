import { Button } from '../ui/button';
import { AlertTriangle, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

const LowStockAlert = ({ items, onReorder }) => {
  const lowStockItems = items.filter(item => item.stockQuantity <= item.lowStockThreshold);

  if (lowStockItems.length === 0) {
    return (
      <div className='bg-green-50 border border-green-200 rounded-md p-4 flex items-center'>
        <div className='bg-green-100 rounded-full p-1 mr-4'>
          <div className='bg-green-500 rounded-full w-6 h-6 flex items-center justify-center'>
            <span className='text-white text-sm'>✓</span>
          </div>
        </div>
        <div>
          <p className='font-medium text-green-800'>All items are in stock</p>
          <p className='text-sm text-green-600'>No inventory items are below minimum stock levels.</p>
        </div>
      </div>
    );
  }

  const handleReorder = item => {
    if (onReorder) {
      onReorder(item);
    } else {
      toast.success(`Reorder request sent for ${item.partName}`);
    }
  };

  return (
    <div className='space-y-4'>
      <div className='bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-center'>
        <div className='bg-yellow-100 rounded-full p-1 mr-4'>
          <div className='bg-yellow-500 rounded-full w-6 h-6 flex items-center justify-center'>
            <AlertTriangle className='h-4 w-4 text-white' />
          </div>
        </div>
        <div>
          <p className='font-medium text-yellow-800'>Low stock alert</p>
          <p className='text-sm text-yellow-600'>
            {lowStockItems.length} item{lowStockItems.length !== 1 ? 's' : ''}{' '}
            {lowStockItems.length !== 1 ? 'are' : 'is'} below minimum stock levels.
          </p>
        </div>
      </div>

      <div className='bg-white border rounded-md divide-y'>
        {lowStockItems.map(item => (
          <div key={item.id} className='p-3 flex justify-between items-center'>
            <div>
              <div className='flex items-center'>
                <span className='font-medium'>{item.partName}</span>
                {item.stockQuantity === 0 && (
                  <span className='ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full'>Out of Stock</span>
                )}
              </div>
              <div className='text-sm text-gray-500 flex items-center gap-2'>
                <span>Current: {item.stockQuantity}</span>
                <span>•</span>
                <span>Minimum: {item.lowStockThreshold}</span>
              </div>
            </div>
            <Button variant='outline' size='sm' onClick={() => handleReorder(item)} className='flex items-center'>
              <ShoppingCart className='h-3 w-3 mr-1' /> Reorder
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStockAlert;
