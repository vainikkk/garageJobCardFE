import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';
import WhatsAppShare from '../dialogs/WhatsAppShare';

const QuickUpdate = ({ open, onOpenChange, jobCard, onUpdateJobCard }) => {
  const [status, setStatus] = useState('pending');
  const [notes, setNotes] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('unpaid');
  const [showWhatsAppDialog, setShowWhatsAppDialog] = useState(false);
  const [whatsAppMode, setWhatsAppMode] = useState('jobUpdate');

  useEffect(() => {
    if (jobCard) {
      setStatus(jobCard.status);
      setNotes(jobCard.serviceNotes || '');
      setPaymentStatus(jobCard.paymentStatus);
    }
  }, [jobCard]);

  const handleSave = () => {
    if (!jobCard) return;

    const updatedJobCard = {
      status,
      serviceNotes: notes,
      paymentStatus,
      updatedAt: new Date(),
    };

    onUpdateJobCard(updatedJobCard);
    onOpenChange(false);

    toast.success(`Job Card #${jobCard.id} has been updated`);

    // If status changed to completed, offer to send WhatsApp notification
    if (status === 'completed' && jobCard.status !== 'completed') {
      setWhatsAppMode('completion');
      setShowWhatsAppDialog(true);
    }
    // If status changed to awaiting-payment, offer to send payment reminder
    else if (status === 'awaiting-payment' && jobCard.status !== 'awaiting-payment') {
      setWhatsAppMode('paymentReminder');
      setShowWhatsAppDialog(true);
    }
  };

  const handleNotifyCustomer = () => {
    if (!jobCard) return;
    setWhatsAppMode('jobUpdate');
    setShowWhatsAppDialog(true);
  };

  if (!jobCard) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Quick Update - Job #{jobCard.id}</DialogTitle>
          </DialogHeader>
          <div>
            <div className='grid gap-4 py-4'>
              <div className='grid gap-2'>
                <Label htmlFor='status'>Status</Label>
                <Select value={status} onValueChange={value => setStatus(value)}>
                  <SelectTrigger id='status'>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='pending'>Pending</SelectItem>
                    <SelectItem value='in-progress'>In Progress</SelectItem>
                    <SelectItem value='completed'>Completed</SelectItem>
                    <SelectItem value='awaiting-payment'>Awaiting Payment</SelectItem>
                    <SelectItem value='cancelled'>Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='payment-status'>Payment Status</Label>
                <Select value={paymentStatus} onValueChange={value => setPaymentStatus(value)}>
                  <SelectTrigger id='payment-status'>
                    <SelectValue placeholder='Select payment status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='unpaid'>Unpaid</SelectItem>
                    <SelectItem value='partially-paid'>Partially Paid</SelectItem>
                    <SelectItem value='paid'>Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='notes'>Service Notes</Label>
                <Textarea
                  id='notes'
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder='Enter service notes or updates...'
                  className='min-h-[100px]'
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleNotifyCustomer}>Notify Customer</Button>
            <Button
              onClick={handleSave}
              className='bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700'
            >
              Save Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <WhatsAppShare
        open={showWhatsAppDialog}
        onOpenChange={setShowWhatsAppDialog}
        jobCard={jobCard}
        mode={whatsAppMode}
      />
    </>
  );
};

export default QuickUpdate;
