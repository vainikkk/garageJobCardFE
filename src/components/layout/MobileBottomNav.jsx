import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, User, Search, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function MobileBottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Navigation items with their icons and paths
  const navItems = [
    { text: 'Home', icon: <Home className='h-5 w-5' />, path: '/' },
    { text: 'Job Cards', icon: <FileText className='h-5 w-5' />, path: '/job-cards' },
    { text: 'Search', icon: <Search className='h-5 w-5' />, path: '/search' },
    { text: 'Customers', icon: <User className='h-5 w-5' />, path: '/customers' },
    { text: 'Account', icon: <Settings className='h-5 w-5' />, path: '/profile' },
  ];

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 lg:hidden'>
      <div className='flex h-16 w-full items-center justify-around bg-white/90 backdrop-blur-lg border-t shadow-lg'>
        {navItems.map(item => {
          const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
          return (
            <Link
              key={item.text}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center px-3 py-1 rounded-lg transition-all',
                isActive ? 'text-garage-primary' : 'text-gray-500 hover:text-garage-primary'
              )}
            >
              <div className={cn('p-1 rounded-full', isActive && 'bg-garage-primary/10')}>{item.icon}</div>
              <span className='text-xs font-medium mt-1'>{item.text}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
