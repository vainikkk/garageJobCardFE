import { Badge } from '../components/ui/badge';
import { getPaymentStatusColor, getPaymentStatusLabel } from '../../lib/utils';
import { cn } from '../../lib/utils';

const PaymentStatus = ({ status, className }) => {
  return (
    <Badge variant='outline' className={cn('font-normal', getPaymentStatusColor(status), className)}>
      {getPaymentStatusLabel(status)}
    </Badge>
  );
};

export default PaymentStatus;
