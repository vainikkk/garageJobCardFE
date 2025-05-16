import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';

const ReportScheduler = ({ onSchedule, defaultTime = '18:00', defaultPhoneNumber = '', defaultEnabled = false }) => {
  const [scheduledTime, setScheduledTime] = useState(defaultTime);
  const [phoneNumber, setPhoneNumber] = useState(defaultPhoneNumber);
  const [enabled, setEnabled] = useState(defaultEnabled);

  const handleSaveSchedule = () => {
    if (!phoneNumber) {
      toast.error('Please enter a phone number for reports');
      return;
    }

    // In a real app, this would save the schedule to the database
    onSchedule(scheduledTime, phoneNumber, enabled);
    toast.success(`Daily report ${enabled ? 'scheduled' : 'schedule updated'} for ${scheduledTime}`);
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <Label htmlFor='schedule-enabled'>Enable Daily Reports</Label>
        <Switch id='schedule-enabled' checked={enabled} onCheckedChange={setEnabled} />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='owner-phone'>Owner's WhatsApp Number</Label>
        <Input
          id='owner-phone'
          type='tel'
          placeholder='+1234567890'
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          className='max-w-xs'
        />
        <p className='text-sm text-muted-foreground'>Include country code (e.g., +1 for US)</p>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='report-time'>Daily Report Time</Label>
        <Input
          id='report-time'
          type='time'
          value={scheduledTime}
          onChange={e => setScheduledTime(e.target.value)}
          className='max-w-xs'
          disabled={!enabled}
        />
        <p className='text-sm text-muted-foreground'>Reports will be sent daily at this time</p>
      </div>

      <Button onClick={handleSaveSchedule} className='mt-2'>
        Save Schedule
      </Button>
    </div>
  );
};

export default ReportScheduler;
