import PageLayout from '../components/layout/PageLayout';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SectionPlaceholder = ({ title, description = 'This section is under development', icon }) => {
  return (
    <PageLayout>
      <div className='flex flex-col items-center justify-center py-12'>
        <div className='bg-garage-light p-6 rounded-full mb-6'>{icon}</div>
        <h1 className='text-3xl font-bold text-gray-900 mb-4 text-center'>{title}</h1>
        <p className='text-gray-600 mb-8 text-center max-w-md'>{description}</p>
        <Button asChild>
          <Link to='/'>
            <ArrowLeft className='mr-2 h-4 w-4' /> Back to Dashboard
          </Link>
        </Button>
      </div>
    </PageLayout>
  );
};

export default SectionPlaceholder;
