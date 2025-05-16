import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    jobCardUpdates: true,
    paymentNotifications: true,
    appointmentReminders: true,
    marketingCommunications: false,
  });

  useEffect(() => {
    // Load settings from localStorage if available
    const savedSettings = localStorage.getItem('notificationSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Save settings to localStorage
    localStorage.setItem('notificationSettings', JSON.stringify(settings));

    toast.success('Notification settings saved successfully!');
  };

  return (
    <Card className='shadow-soft'>
      <CardHeader>
        <CardTitle className='text-garage-primary text-xl'>Notification Settings</CardTitle>
        <CardDescription>Configure how you receive notifications from the system</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-4'>
          <h3 className='text-sm font-medium'>Notification Channels</h3>
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label htmlFor='emailNotifications'>Email Notifications</Label>
                <p className='text-sm text-muted-foreground'>Receive notifications via email</p>
              </div>
              <Switch
                id='emailNotifications'
                checked={settings.emailNotifications}
                onCheckedChange={checked => handleChange('emailNotifications', checked)}
              />
            </div>

            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label htmlFor='smsNotifications'>SMS Notifications</Label>
                <p className='text-sm text-muted-foreground'>Receive notifications via SMS</p>
              </div>
              <Switch
                id='smsNotifications'
                checked={settings.smsNotifications}
                onCheckedChange={checked => handleChange('smsNotifications', checked)}
              />
            </div>

            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label htmlFor='pushNotifications'>Push Notifications</Label>
                <p className='text-sm text-muted-foreground'>Receive push notifications on your devices</p>
              </div>
              <Switch
                id='pushNotifications'
                checked={settings.pushNotifications}
                onCheckedChange={checked => handleChange('pushNotifications', checked)}
              />
            </div>
          </div>
        </div>

        <Separator className='my-4' />

        <div className='space-y-4'>
          <h3 className='text-sm font-medium'>Notification Types</h3>
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label htmlFor='jobCardUpdates'>Job Card Updates</Label>
                <p className='text-sm text-muted-foreground'>Notifications when job cards are updated</p>
              </div>
              <Switch
                id='jobCardUpdates'
                checked={settings.jobCardUpdates}
                onCheckedChange={checked => handleChange('jobCardUpdates', checked)}
              />
            </div>

            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label htmlFor='paymentNotifications'>Payment Notifications</Label>
                <p className='text-sm text-muted-foreground'>Notifications for payments received or due</p>
              </div>
              <Switch
                id='paymentNotifications'
                checked={settings.paymentNotifications}
                onCheckedChange={checked => handleChange('paymentNotifications', checked)}
              />
            </div>

            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label htmlFor='appointmentReminders'>Appointment Reminders</Label>
                <p className='text-sm text-muted-foreground'>Reminders for upcoming appointments</p>
              </div>
              <Switch
                id='appointmentReminders'
                checked={settings.appointmentReminders}
                onCheckedChange={checked => handleChange('appointmentReminders', checked)}
              />
            </div>

            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label htmlFor='marketingCommunications'>Marketing Communications</Label>
                <p className='text-sm text-muted-foreground'>Updates on promotions and marketing campaigns</p>
              </div>
              <Switch
                id='marketingCommunications'
                checked={settings.marketingCommunications}
                onCheckedChange={checked => handleChange('marketingCommunications', checked)}
              />
            </div>
          </div>
        </div>

        <div className='flex justify-end pt-4'>
          <Button onClick={handleSave} className='bg-garage-primary hover:bg-garage-primary/90'>
            <Save className='mr-2 h-4 w-4' /> Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
