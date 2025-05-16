import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { formatCurrency } from '../../lib/utils';

const WhatsAppShare = ({
  open,
  onOpenChange,
  jobCard,
  mode = 'jobUpdate',
  phoneNumber: initialPhoneNumber,
  reportData,
}) => {
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber || '');

  const formatReportForWhatsApp = data => {
    let message = '*GARAGE SERVICE PRO - DAILY REPORT*\n\n';

    // Pending Jobs
    message += '*📋 PENDING JOBS*\n';
    if (data.pendingJobs.length > 0) {
      data.pendingJobs.forEach((job, index) => {
        message += `${index + 1}. ${job.id} - ${job.customerName} (${job.vehicleReg})\n   Status: ${
          job.status
        }, Mechanic: ${job.mechanicName}\n`;
      });
    } else {
      message += 'No pending jobs.\n';
    }

    message += '\n';

    // Completed Today
    message += '*✅ COMPLETED TODAY*\n';
    if (data.completedToday.length > 0) {
      data.completedToday.forEach((job, index) => {
        message += `${index + 1}. ${job.id} - ${job.customerName} (${job.vehicleReg})\n   Amount: ${formatCurrency(
          job.totalAmount
        )}\n`;
      });
    } else {
      message += 'No jobs completed today.\n';
    }

    message += '\n';

    // Monthly Summary
    message += '*📊 MONTHLY SUMMARY*\n';
    message += `Total Jobs: ${data.monthlySummary.totalJobs}\n`;
    message += `Total Revenue: ${formatCurrency(data.monthlySummary.totalRevenue)}\n`;
    message += `Pending Payments: ${formatCurrency(data.monthlySummary.pendingPayments)}\n\n`;

    // Pending Payments
    message += '*💰 PAYMENT PENDING JOBS*\n';
    if (data.pendingPayments.length > 0) {
      data.pendingPayments.forEach((job, index) => {
        message += `${index + 1}. ${job.id} - ${job.customerName}\n   Amount Due: ${formatCurrency(job.amountDue)}\n`;
      });
    } else {
      message += 'No pending payments.\n';
    }

    // Add timestamp
    message += '\nGenerated on: ' + new Date().toLocaleString();

    return message;
  };

  const getMessageTemplate = () => {
    if (mode === 'dailyReport' && reportData) {
      return formatReportForWhatsApp(reportData);
    }

    if (!jobCard) return '';

    switch (mode) {
      case 'completion':
        return (
          `Dear ${jobCard.customerName},\n\n` +
          `Your vehicle (${jobCard.vehicleReg}) service is complete. Total bill: ${formatCurrency(
            jobCard.totalAmount
          )}. ` +
          `Please visit the garage for pickup.\n\n` +
          `Thank you for choosing our service.\n` +
          `Garage Service Pro`
        );

      case 'paymentReminder':
        return (
          `Dear ${jobCard.customerName},\n\n` +
          `Your payment of ${formatCurrency(jobCard.totalAmount)} is pending for job #${jobCard.id}. ` +
          `Please complete the payment at your earliest convenience.\n\n` +
          `Thank you for your business.\n` +
          `Garage Service Pro`
        );

      case 'jobUpdate':
      default:
        return (
          `Job Card Update #${jobCard.id}\n\n` +
          `Customer: ${jobCard.customerName}\n` +
          `Vehicle: ${jobCard.vehicleMake} ${jobCard.vehicleModel} (${jobCard.vehicleReg})\n` +
          `Status: ${jobCard.status}\n` +
          `Total Amount: ${formatCurrency(jobCard.totalAmount)}\n\n` +
          `Thank you for choosing Garage Service Pro.`
        );
    }
  };

  const handleShareViaWhatsApp = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    // Format phone number (remove spaces, dashes, etc)
    const formattedNumber = phoneNumber.replace(/\D/g, '');

    // Create message with job card details
    const message = getMessageTemplate();

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp link
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    // Close dialog and show success toast
    onOpenChange(false);
    toast.success('Opening WhatsApp with job details');
  };

  const getDialogTitle = () => {
    switch (mode) {
      case 'completion':
        return 'Share Completion Notice';
      case 'paymentReminder':
        return 'Send Payment Reminder';
      case 'dailyReport':
        return 'Share Daily Report';
      case 'jobUpdate':
      default:
        return 'Share via WhatsApp';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
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
                placeholder='e.g. +1234567890'
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
              />
            </div>
            <p className='text-xs text-gray-500 mt-1'>Include country code (e.g., +1 for US)</p>
          </div>
          <div className='pt-4 border-t'>
            <h4 className='text-sm font-medium mb-2'>Message Preview</h4>
            <div className='bg-gray-50 p-3 rounded-md text-sm whitespace-pre-line max-h-72 overflow-y-auto'>
              {getMessageTemplate()}
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

export default WhatsAppShare;
