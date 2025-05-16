import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import { Button } from '../components/ui/button';
import { jobCards, mechanics } from '../lib/mockData';
import {
  FileText,
  ArrowLeft,
  Calendar,
  Car,
  User,
  Wrench,
  Clock,
  PenSquare,
  Share2,
  MessageSquare,
} from 'lucide-react';
import { toast } from 'sonner';
import ActionsMenu from '../components/jobcard/ActionsMenu';
import AdvancedFeatures from '../components/jobcard/AdvancedFeatures';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import QuickUpdate from '../components/jobcard/QuickUpdate';
import WhatsAppShare from '../components/dialogs/WhatsAppShare';

const JobCardDetails = () => {
  const { id } = useParams();
  const [jobCard, setJobCard] = useState(null);
  const [mechanicName, setMechanicName] = useState('Not assigned');
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showQuickUpdate, setShowQuickUpdate] = useState(false);
  const [showWhatsAppShare, setShowWhatsAppShare] = useState(false);

  useEffect(() => {
    // Find the job card
    const foundJobCard = jobCards.find(job => job.id === id);
    if (foundJobCard) {
      setJobCard(foundJobCard);

      // Get mechanic name if assigned
      if (foundJobCard.assignedMechanicId) {
        const mechanic = mechanics.find(m => m.id === foundJobCard.assignedMechanicId);
        setMechanicName(mechanic ? mechanic.name : 'Unknown Mechanic');
      }
    }
  }, [id]);

  const getStatusColor = status => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'awaiting-payment':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = status => {
    switch (status) {
      case 'in-progress':
        return 'In Progress';
      case 'awaiting-payment':
        return 'Awaiting Payment';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const handleUpdateStatus = newStatus => {
    if (jobCard) {
      // In a real application, this would call an API
      setJobCard({
        ...jobCard,
        status: newStatus,
        updatedAt: new Date(),
      });

      toast.success(`Job card status updated to ${getStatusLabel(newStatus)}`);
    }
  };

  const handleUpdateJobCard = updatedCard => {
    if (jobCard) {
      // In a real application, this would call an API
      setJobCard({
        ...jobCard,
        ...updatedCard,
        updatedAt: new Date(),
      });
    }
  };

  const handleShareViaWhatsApp = () => {
    // Open the WhatsApp share dialog
    setShowWhatsAppShare(true);
  };

  const handleConfirmWhatsAppShare = phoneNumber => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    // Format phone number (remove spaces, dashes, etc)
    const formattedNumber = phoneNumber.replace(/\D/g, '');

    // Create message with job card details
    let message = '';
    if (jobCard) {
      message =
        `Job Card #${jobCard.id} - ${jobCard.customerName}\n` +
        `Vehicle: ${jobCard.vehicleMake} ${jobCard.vehicleModel} (${jobCard.vehicleReg})\n` +
        `Status: ${getStatusLabel(jobCard.status)}\n` +
        `Date: ${jobCard.dateOfService.toLocaleDateString()}\n` +
        `Service Notes: ${jobCard.serviceNotes || 'N/A'}\n` +
        `Amount: $${jobCard.totalAmount.toFixed(2)}\n` +
        `Payment Status: ${jobCard.paymentStatus
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')}`;
    }

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp link
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    // Close dialog and show success toast
    setShowShareDialog(false);
    toast.success('Opening WhatsApp with job card details');
  };

  const handleGenerateBill = () => {
    if (!jobCard) return;

    try {
      // In a real app, this would generate a proper PDF
      // For now, create a simple text representation
      const billText = `
        GARAGE SERVICE PRO
        INVOICE
        -------------------
        Job Card: #${jobCard.id}
        Customer: ${jobCard.customerName}
        Vehicle: ${jobCard.vehicleMake} ${jobCard.vehicleModel} (${jobCard.vehicleReg})
        Date: ${jobCard.dateOfService.toLocaleDateString()}
        
        Services:
        [Service details would be listed here]
        
        Total Amount: $${jobCard.totalAmount.toFixed(2)}
        Payment Status: ${jobCard.paymentStatus
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')}
      `;

      // Create a blob from the text
      const blob = new Blob([billText], { type: 'text/plain' });

      // Create URL for the blob
      const url = URL.createObjectURL(blob);

      // Create temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${jobCard.id}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Bill generated successfully');
    } catch (error) {
      console.error('Error generating bill:', error);
      toast.error('Failed to generate bill');
    }
  };

  const handleRequestSignature = () => {
    toast.info('Digital signature functionality will be implemented soon.');
  };

  if (!jobCard) {
    return (
      <PageLayout>
        <div className='text-center py-20'>
          <div className='flex justify-center mb-4'>
            <FileText className='h-12 w-12 text-gray-400' />
          </div>
          <h3 className='text-xl font-medium text-gray-900'>Job Card not found</h3>
          <p className='text-gray-500 mt-2'>The job card you're looking for doesn't exist or has been removed.</p>
          <Button variant='outline' className='mt-4' asChild>
            <Link to='/job-cards'>
              <ArrowLeft className='mr-2 h-4 w-4' /> Back to Job Cards
            </Link>
          </Button>
        </div>
      </PageLayout>
    );
  }

  // Convert services to the expected format for ActionsMenu
  const formattedServices = jobCard.services
    ? jobCard.services.map(service => ({
        name: service.customServiceName || service.serviceDescription || 'Service',
        price: service.serviceCost || 0,
      }))
    : [];

  return (
    <PageLayout>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-6'>
        <div>
          <div className='flex items-center gap-2 mb-2'>
            <Link to='/job-cards' className='text-garage-primary hover:text-garage-primary/80'>
              <ArrowLeft className='h-4 w-4' />
            </Link>
            <h1 className='text-2xl font-bold text-gray-900'>Job Card Details</h1>
          </div>
          <p className='text-gray-500'>
            #{jobCard.id} - {jobCard.customerName}
          </p>
        </div>

        <div className='mt-4 md:mt-0 flex items-center gap-3'>
          <Button variant='outline' size='sm' onClick={() => setShowQuickUpdate(true)} className='flex items-center'>
            <MessageSquare className='mr-2 h-4 w-4' />
            Quick Update
          </Button>
          <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(jobCard.status)}`}>
            {getStatusLabel(jobCard.status)}
          </span>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          <div className='bg-white rounded-lg shadow p-6'>
            <h3 className='text-lg font-semibold mb-4'>Job Card Information</h3>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <div>
                <h4 className='text-sm text-gray-500 mb-2'>Customer Information</h4>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <div className='flex items-start mb-3'>
                    <User className='h-5 w-5 mr-2 text-garage-primary' />
                    <div>
                      <p className='font-medium'>{jobCard.customerName}</p>
                      <Link
                        to={`/customers/${jobCard.customerId}`}
                        className='text-sm text-garage-primary hover:underline'
                      >
                        View Customer Profile
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className='text-sm text-gray-500 mb-2'>Vehicle Information</h4>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <div className='flex items-start mb-3'>
                    <Car className='h-5 w-5 mr-2 text-garage-primary' />
                    <div>
                      <p className='font-medium'>
                        {jobCard.vehicleMake} {jobCard.vehicleModel}
                      </p>
                      <p className='text-sm'>{jobCard.vehicleReg}</p>
                      <Link
                        to={`/vehicles/${jobCard.vehicleId}`}
                        className='text-sm text-garage-primary hover:underline'
                      >
                        View Vehicle Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6'>
              <div>
                <p className='text-xs text-gray-500'>Odometer</p>
                <p className='font-medium'>{jobCard.odometerReadingAtService.toLocaleString()} km</p>
              </div>
              <div>
                <p className='text-xs text-gray-500'>Fuel Level</p>
                <p className='font-medium capitalize'>{jobCard.fuelLevel}</p>
              </div>
              <div>
                <p className='text-xs text-gray-500'>Date of Service</p>
                <p className='font-medium'>{jobCard.dateOfService.toLocaleDateString()}</p>
              </div>
              <div>
                <p className='text-xs text-gray-500'>Estimated Completion</p>
                <p className='font-medium'>
                  {jobCard.estimatedCompletionDate
                    ? jobCard.estimatedCompletionDate.toLocaleDateString()
                    : 'Not specified'}
                </p>
              </div>
            </div>

            <div className='mt-6'>
              <h4 className='text-sm text-gray-500 mb-2'>Assigned Mechanic</h4>
              <div className='flex items-center'>
                <Wrench className='h-5 w-5 mr-2 text-garage-primary' />
                <p>{mechanicName}</p>
              </div>
            </div>

            {jobCard.serviceNotes && (
              <div className='mt-6'>
                <h4 className='text-sm text-gray-500 mb-2'>Service Notes</h4>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <p>{jobCard.serviceNotes}</p>
                </div>
              </div>
            )}
          </div>

          <div className='bg-white rounded-lg shadow p-6 mt-6'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-semibold'>Services & Parts</h3>
              <Button variant='outline' size='sm'>
                <PenSquare className='mr-2 h-4 w-4' /> Edit Services
              </Button>
            </div>

            {jobCard.services && jobCard.services.length > 0 ? (
              <div className='space-y-4'>
                {/* Here you would render the services */}
                <p className='text-center text-gray-500 py-4'>Service details will be displayed here.</p>
              </div>
            ) : (
              <div className='text-center py-6 border border-dashed rounded-lg'>
                <p className='text-gray-500'>No services have been added to this job card yet.</p>
              </div>
            )}
          </div>

          {/* Add Advanced Features section */}
          <div className='bg-white rounded-lg shadow p-6 mt-6'>
            <h3 className='text-lg font-semibold mb-4'>Advanced Options</h3>
            <AdvancedFeatures />
          </div>
        </div>

        <div className='lg:col-span-1'>
          <div className='bg-white rounded-lg shadow p-6'>
            <h3 className='text-lg font-semibold mb-4'>Job Card Actions</h3>

            <div className='space-y-4'>
              <div>
                <h4 className='text-sm text-gray-500 mb-2'>Update Status</h4>
                <div className='grid grid-cols-2 gap-2'>
                  <Button
                    variant={jobCard.status === 'pending' ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => handleUpdateStatus('pending')}
                    className='w-full'
                  >
                    Pending
                  </Button>
                  <Button
                    variant={jobCard.status === 'in-progress' ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => handleUpdateStatus('in-progress')}
                    className='w-full'
                  >
                    In Progress
                  </Button>
                  <Button
                    variant={jobCard.status === 'completed' ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => handleUpdateStatus('completed')}
                    className='w-full'
                  >
                    Completed
                  </Button>
                  <Button
                    variant={jobCard.status === 'awaiting-payment' ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => handleUpdateStatus('awaiting-payment')}
                    className='w-full'
                  >
                    Awaiting Payment
                  </Button>
                </div>
              </div>

              <div className='pt-4 space-y-3'>
                <Button className='w-full flex justify-center items-center' onClick={handleShareViaWhatsApp}>
                  <Share2 className='mr-2 h-4 w-4' />
                  Share via WhatsApp
                </Button>

                <ActionsMenu
                  jobCardData={{
                    id: jobCard.id,
                    customerName: jobCard.customerName,
                    vehicleInfo: `${jobCard.vehicleMake} ${jobCard.vehicleModel} (${jobCard.vehicleReg})`,
                    services: formattedServices,
                    totalAmount: jobCard.totalAmount,
                    jobCardId: jobCard.id,
                  }}
                  variant='outline'
                />
              </div>

              <div className='pt-4'>
                <h4 className='text-sm text-gray-500 mb-2'>Payment Status</h4>
                <div className='flex justify-between bg-gray-50 p-3 rounded-md'>
                  <span>Total Amount</span>
                  <span className='font-semibold'>${jobCard.totalAmount.toFixed(2)}</span>
                </div>
                <div className='mt-2 flex justify-between items-center'>
                  <span className='text-sm'>Status</span>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      jobCard.paymentStatus === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : jobCard.paymentStatus === 'partially-paid'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {jobCard.paymentStatus
                      .split('-')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </span>
                </div>
              </div>

              <div className='pt-4 border-t'>
                <div className='flex justify-between items-center'>
                  <span className='text-sm text-gray-500'>Created</span>
                  <span className='text-sm'>
                    <Calendar className='h-3 w-3 inline mr-1' />
                    {jobCard.createdAt.toLocaleDateString()}
                  </span>
                </div>
                <div className='flex justify-between items-center mt-2'>
                  <span className='text-sm text-gray-500'>Last Updated</span>
                  <span className='text-sm'>
                    <Clock className='h-3 w-3 inline mr-1' />
                    {jobCard.updatedAt.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Job Card via WhatsApp</DialogTitle>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div>
              <label htmlFor='phone-number' className='text-sm font-medium block mb-2'>
                Enter WhatsApp Number
              </label>
              <div className='flex space-x-2'>
                <input
                  id='phone-number'
                  type='tel'
                  placeholder='e.g. +1234567890'
                  className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                />
              </div>
              <p className='text-xs text-gray-500 mt-1'>Include country code (e.g., +1 for US)</p>
            </div>
            <div className='pt-4 border-t'>
              <h4 className='text-sm font-medium mb-2'>Job Card Preview</h4>
              <div className='bg-gray-50 p-3 rounded-md text-sm'>
                <p>
                  <strong>Job Card #{jobCard.id}</strong> - {jobCard.customerName}
                </p>
                <p>
                  Vehicle: {jobCard.vehicleMake} {jobCard.vehicleModel} ({jobCard.vehicleReg})
                </p>
                <p>Status: {getStatusLabel(jobCard.status)}</p>
                <p>Date: {jobCard.dateOfService.toLocaleDateString()}</p>
                <p>Amount: ${jobCard.totalAmount.toFixed(2)}</p>
              </div>
            </div>
            <div className='flex justify-end gap-2 pt-4'>
              <Button variant='outline' onClick={() => setShowShareDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const phoneInput = document.getElementById('phone-number');
                  handleConfirmWhatsAppShare(phoneInput.value);
                }}
              >
                Share via WhatsApp
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <QuickUpdate
        open={showQuickUpdate}
        onOpenChange={setShowQuickUpdate}
        jobCard={jobCard}
        onUpdateJobCard={handleUpdateJobCard}
      />

      <WhatsAppShare open={showWhatsAppShare} onOpenChange={setShowWhatsAppShare} jobCard={jobCard} mode='jobUpdate' />
    </PageLayout>
  );
};

export default JobCardDetails;
