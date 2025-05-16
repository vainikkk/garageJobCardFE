import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileBottomNav from './MobileBottomNav';
import { cn } from '../../lib/utils';
import { useIsMobile } from '../../hooks/use-mobile';

const PageLayout = ({ children, className }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800'>
      <Header toggleSidebar={toggleSidebar} />
      <div className='flex flex-1 relative'>
        <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
        <main
          className={cn(
            'flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto animate-fade-slide-in',
            'transition-all duration-300 ease-in-out',
            isMobile ? 'pb-20' : '', // Add padding at bottom for mobile devices
            className
          )}
        >
          <div className='max-w-screen-2xl mx-auto'>{children}</div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default PageLayout;
