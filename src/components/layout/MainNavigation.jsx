import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Users, Building, Settings, TestTube, FileText } from 'lucide-react';

const NavItem = ({ label, href, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <li className='mb-1'>
      <Link
        to={href}
        className={`flex items-center px-3 py-2 rounded-lg hover:bg-garage-primary/10 transition-colors duration-200 ${
          isActive ? 'bg-garage-primary/20 font-semibold' : 'text-gray-600'
        }`}
      >
        {icon}
        <span className='ml-3'>{label}</span>
      </Link>
    </li>
  );
};

const MainNavigation = () => {
  return (
    <aside className='w-64 bg-white border-r border-gray-200 h-full py-8 px-3 flex-shrink-0'>
      <div className='mb-8'>
        <Link to='/' className='flex items-center text-garage-primary font-bold text-lg'>
          <Building className='mr-2 h-6 w-6' />
          GarageApp
        </Link>
      </div>

      <nav>
        <ul>
          <NavItem label='Dashboard' href='/' icon={<Home className='h-5 w-5' />} />
          <NavItem label='Job Cards' href='/job-cards' icon={<FileText className='h-5 w-5' />} />
          <NavItem label='Appointments' href='/appointments' icon={<Calendar className='h-5 w-5' />} />
          <NavItem label='Customers' href='/customers' icon={<Users className='h-5 w-5' />} />
          <NavItem label='Services' href='/services' icon={<FileText className='h-5 w-5' />} />
          {localStorage.getItem('isAdmin') === 'true' && (
            <>
              <NavItem label='Settings' href='/settings' icon={<Settings className='h-5 w-5' />} />
              <NavItem label='Testing' href='/testing' icon={<TestTube className='h-5 w-5' />} />
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default MainNavigation;
