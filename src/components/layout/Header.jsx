import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Home, Menu, User } from 'lucide-react';

import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { useToast } from '../../hooks/use-toast';
import { useIsMobile } from '../../hooks/use-mobile';
// import MainNavigation from './MainNavigation';

const Header = ({ toggleSidebar }) => {
  const [notificationsCount] = useState(3);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const showNotifications = () => {
    toast({
      title: 'Notifications',
      description: 'You have 3 unread notifications.',
      duration: 3000,
    });
  };

  return (
    <header
      className={cn(
        'py-2 px-4 sticky top-0 z-50 backdrop-blur-sm',
        isMobile
          ? 'bg-gradient-to-r from-garage-primary to-garage-primary/90 text-white shadow-md'
          : 'bg-transparent text-garage-primary'
      )}
    >
      <div className='flex justify-between items-center max-w-screen-2xl mx-auto'>
        <div className='flex items-center gap-4'>
          <Button
            variant='ghost'
            size='icon'
            className={cn(
              'lg:hidden',
              isMobile ? 'text-white hover:bg-white/10' : 'text-garage-primary hover:bg-garage-primary/10'
            )}
            onClick={toggleSidebar}
          >
            <Menu className='h-5 w-5' />
          </Button>
          <Link to='/' className='flex items-center gap-2'>
            <div className={cn('p-1.5 rounded-md shadow-sm', isMobile ? 'bg-white' : 'bg-garage-primary')}>
              <Home className={cn('h-5 w-5', isMobile ? 'text-garage-primary' : 'text-white')} />
            </div>
            <span
              className={cn(
                'font-bold text-xl tracking-tight transition-all duration-300',
                'hidden md:block',
                isMobile ? 'text-white' : 'text-garage-primary'
              )}
            >
              Garage Service Pro
            </span>
            <span className={cn('font-bold text-xl md:hidden', isMobile ? 'text-white' : 'text-garage-primary')}>
              GSP
            </span>
          </Link>

          {/* Add main navigation here */}
          <div className='ml-6 hidden lg:block'>
            {/* <MainNavigation /> */}
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <Button
            variant='ghost'
            size='icon'
            className={cn(
              'relative',
              isMobile ? 'text-white hover:bg-white/10' : 'text-garage-primary hover:bg-garage-primary/10'
            )}
            onClick={showNotifications}
          >
            <Bell className='h-5 w-5' />
            {notificationsCount > 0 && (
              <span className='absolute top-0 right-0 bg-garage-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse'>
                {notificationsCount}
              </span>
            )}
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className={cn(isMobile ? 'text-white hover:bg-white/10' : 'text-garage-primary hover:bg-garage-primary/10')}
            asChild
          >
            {/* <Link to='/profile'> */}
              <User className='h-5 w-5' />
            {/* </Link> */}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
