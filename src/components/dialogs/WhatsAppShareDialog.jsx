import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';

const WhatsAppShareDialog = ({ open, onOpenChange, jobCardData }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleShareViaWhatsApp = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    // Format phone number (remove spaces, dashes, etc)
    const formattedNumber = phoneNumber.replace(/\D/g, '');

    // Create message with job card details
    let message =
      `Job Card #${jobCardData.jobCardId} - ${jobCardData.customerName}\n` +
      `Vehicle: ${jobCardData.vehicleInfo}\n\n` +
      `Services:\n`;

    // Add services
    jobCardData.services.forEach(service => {
      message += `- ${service.name}: ₹${service.price}\n`;
    });

    message += `\nTotal Amount: ₹${jobCardData.totalAmount}`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp link
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    // Close dialog and show success toast
    onOpenChange(false);
    toast.success('Opening WhatsApp with job card details');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              <Input
                id='phone-number'
                type='tel'
                placeholder='e.g. +911234567890'
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
              />
            </div>
            <p className='text-xs text-gray-500 mt-1'>Include country code (e.g., +91 for India)</p>
          </div>
          <div className='pt-4 border-t'>
            <h4 className='text-sm font-medium mb-2'>Job Card Preview</h4>
            <div className='bg-gray-50 p-3 rounded-md text-sm'>
              <p>
                <strong>Job Card #{jobCardData.jobCardId}</strong> - {jobCardData.customerName}
              </p>
              <p>Vehicle: {jobCardData.vehicleInfo}</p>
              <p className='font-medium mt-1'>Services:</p>
              <ul className='list-disc list-inside pl-2'>
                {jobCardData.services.map((service, idx) => (
                  <li key={idx} className='text-xs'>
                    {service.name}: ₹{service.price}
                  </li>
                ))}
              </ul>
              <p className='mt-1 font-medium'>Total: ₹{jobCardData.totalAmount}</p>
            </div>
          </div>
          <div className='flex justify-end gap-2 pt-4'>
            <Button variant='outline' onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleShareViaWhatsApp}>Share via WhatsApp</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppShareDialog;
