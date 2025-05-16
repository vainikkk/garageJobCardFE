import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

const QuickAction = ({
  icon,
  title,
  description,
  to,
  colorClass = 'bg-garage-primary text-white hover:bg-garage-primary/90',
  className,
}) => {
  return (
    <Button
      className={cn(
        'flex flex-col items-center justify-center h-auto min-h-24 w-full gap-2 p-4 rounded-xl shadow-sm',
        'transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]',
        colorClass,
        className
      )}
      asChild
    >
      <Link to={to}>
        <div className='text-2xl'>{icon}</div>
        <div className='text-center'>
          <div className='font-semibold text-sm'>{title}</div>
          {description && <div className='text-xs mt-1'>{description}</div>}
        </div>
      </Link>
    </Button>
  );
};

export default QuickAction;
