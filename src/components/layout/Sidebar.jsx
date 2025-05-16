import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Car, CheckSquare, FileText, Home, List, Settings, Truck, User, Users, X } from 'lucide-react';
import { Button } from '../ui/button';

const Sidebar = ({ isOpen, closeSidebar }) => {
  // Navigation items with their icons and paths
  const navItems = [
    { text: 'Dashboard', icon: <Home className='h-5 w-5' />, path: '/dashboard' },
    {
      text: 'Job Cards',
      icon: <FileText className='h-5 w-5' />,
      path: '/job-cards',
    },
    {
      text: 'Customers',
      icon: <Users className='h-5 w-5' />,
      path: '/customers',
    },
    { text: 'Vehicles', icon: <Car className='h-5 w-5' />, path: '/vehicles' },
    {
      text: 'Inventory',
      icon: <List className='h-5 w-5' />,
      path: '/inventory',
    },
    {
      text: 'Mechanics',
      icon: <User className='h-5 w-5' />,
      path: '/mechanics',
    },
    {
      text: 'Services',
      icon: <CheckSquare className='h-5 w-5' />,
      path: '/services',
    },
    {
      text: 'Settings',
      icon: <Settings className='h-5 w-5' />,
      path: '/settings',
    },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300'
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 lg:translate-x-0 lg:relative lg:z-0 pt-4 flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className='flex justify-between items-center px-4 mb-6 mt-2'>
          <div className='flex items-center gap-3'>
            <div className='bg-garage-primary p-2 rounded-full shadow-md'>
              <Truck className='h-6 w-6 text-white' />
            </div>
            <span className='font-bold text-xl text-garage-primary'>GSP</span>
          </div>

          <Button variant='ghost' size='icon' className='lg:hidden' onClick={closeSidebar}>
            <X className='h-5 w-5' />
          </Button>
        </div>

        {/* Make the nav scrollable independently */}
        <nav className='px-2 flex-1 overflow-y-auto'>
          <ul className='space-y-1'>
            {navItems.map(item => (
              <li key={item.text}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center py-3 px-4 rounded-lg transition-all duration-200 hover:bg-garage-light group',
                      isActive
                        ? 'bg-garage-primary text-white hover:bg-garage-primary/90 shadow-sm'
                        : 'text-gray-700 hover:translate-x-1'
                    )
                  }
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      closeSidebar();
                    }
                  }}
                >
                  <span className='mr-3'>{item.icon}</span>
                  <span className='font-medium'>{item.text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* The footer is always visible and accessible */}
        <div className='px-4 py-4 mt-auto'>
          <div className='bg-garage-secondary p-4 rounded-lg'>
            <p className='text-sm text-gray-600 mb-2'>Need help?</p>
            <Button variant='default' className='w-full bg-garage-accent text-white hover:bg-garage-accent/90'>
              Contact Support
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
