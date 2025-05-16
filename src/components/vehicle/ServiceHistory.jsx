import { formatDate, formatCurrency, getStatusColor, getStatusLabel } from '../../lib/utils';
import { Button } from '../ui/button';
import { Share2 } from 'lucide-react';
import { useState } from 'react';
import WhatsAppShare from '../dialogs/WhatsAppShare';

const ServiceHistory = ({ jobCards, vehicleReg, customerName }) => {
  const [showWhatsAppShare, setShowWhatsAppShare] = useState(false);
  const [selectedJobCard, setSelectedJobCard] = useState(null);

  if (!jobCards || jobCards.length === 0) {
    return (
      <div className='text-center py-10 border rounded-md bg-gray-50'>
        <p className='text-muted-foreground'>No service history found for this vehicle.</p>
      </div>
    );
  }

  const handleShareHistory = jobCard => {
    setSelectedJobCard(jobCard);
    setShowWhatsAppShare(true);
  };

  return (
    <div className='space-y-6'>
      <div className='relative border-l-2 border-garage-primary/30 pl-6 ml-3 space-y-10'>
        {jobCards.map((jobCard, index) => (
          <div key={jobCard.id} className='relative'>
            {/* Timeline dot */}
            <div className='absolute -left-9 mt-1.5'>
              <div className='h-5 w-5 rounded-full bg-garage-primary/80'></div>
            </div>

            {/* Date indicator */}
            <div className='text-sm text-garage-primary font-medium mb-2'>{formatDate(jobCard.dateOfService)}</div>

            {/* Job card content */}
            <div className='bg-white rounded-lg shadow-sm border p-4'>
              <div className='flex justify-between items-start'>
                <div>
                  <div className='flex items-center gap-2'>
                    <h4 className='text-lg font-semibold'>Job Card #{jobCard.id}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(jobCard.status)}`}>
                      {getStatusLabel(jobCard.status)}
                    </span>
                  </div>
                  <p className='text-sm text-gray-500 mt-1'>
                    Odometer Reading: {jobCard.odometerReadingAtService.toLocaleString()} km
                  </p>
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => handleShareHistory(jobCard)}
                  className='ml-2 text-xs h-8'
                >
                  <Share2 className='h-3 w-3 mr-1' /> Share
                </Button>
              </div>

              <div className='mt-4'>
                <h5 className='text-sm font-medium mb-1'>Services Performed:</h5>
                <div className='bg-gray-50 rounded p-3'>
                  {jobCard.services && jobCard.services.length > 0 ? (
                    <ul className='space-y-2 text-sm'>
                      {jobCard.services.map((service, i) => (
                        <li key={i} className='flex justify-between'>
                          <span>{service.serviceDescription}</span>
                          <span className='font-medium'>{formatCurrency(service.serviceCost)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className='text-sm text-gray-500 italic'>No services details recorded</p>
                  )}
                </div>
              </div>

              <div className='mt-4 pt-4 border-t flex justify-between items-center'>
                <div>
                  <p className='text-sm text-gray-500'>Total Cost:</p>
                  <p className='font-semibold'>{formatCurrency(jobCard.totalAmount)}</p>
                </div>

                <Button size='sm' asChild>
                  <a href={`/job-cards/${jobCard.id}`}>View Details</a>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <WhatsAppShare
        open={showWhatsAppShare}
        onOpenChange={setShowWhatsAppShare}
        jobCard={selectedJobCard}
        mode='jobUpdate'
      />
    </div>
  );
};

export default ServiceHistory;
