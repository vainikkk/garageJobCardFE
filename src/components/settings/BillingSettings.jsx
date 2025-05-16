import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Separator } from '../ui/separator';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

const BillingSettings = () => {
  const [settings, setSettings] = useState({
    plan: 'standard',
    autoRenew: true,
    emailReceipts: true,
    paymentMethod: 'credit_card',
  });

  useEffect(() => {
    // Load settings from localStorage if available
    const savedSettings = localStorage.getItem('billingSettings');
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
    localStorage.setItem('billingSettings', JSON.stringify(settings));

    toast.success('Billing settings saved successfully!');
  };

  return (
    <Card className='shadow-soft'>
      <CardHeader>
        <CardTitle className='text-garage-primary text-xl'>Billing & Subscription</CardTitle>
        <CardDescription>Manage your subscription plan and billing preferences</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-4'>
          <h3 className='text-sm font-medium'>Subscription Plan</h3>
          <RadioGroup
            value={settings.plan}
            onValueChange={value => handleChange('plan', value)}
            className='grid grid-cols-1 md:grid-cols-3 gap-4'
          >
            <div className='border rounded-md p-4 hover:bg-gray-50 cursor-pointer'>
              <div className='flex items-start'>
                <RadioGroupItem value='basic' id='plan-basic' className='mt-1' />
                <div className='ml-2 flex-1'>
                  <Label htmlFor='plan-basic' className='font-medium block'>
                    Basic
                  </Label>
                  <p className='text-sm text-gray-500 mb-1'>Essential features for small garages</p>
                  <p className='font-semibold'>₹999/month</p>
                </div>
              </div>
            </div>

            <div className='border rounded-md p-4 hover:bg-gray-50 cursor-pointer'>
              <div className='flex items-start'>
                <RadioGroupItem value='standard' id='plan-standard' className='mt-1' />
                <div className='ml-2 flex-1'>
                  <Label htmlFor='plan-standard' className='font-medium block'>
                    Standard
                  </Label>
                  <p className='text-sm text-gray-500 mb-1'>Advanced features for growing businesses</p>
                  <p className='font-semibold'>₹1,999/month</p>
                </div>
              </div>
            </div>

            <div className='border rounded-md p-4 hover:bg-gray-50 cursor-pointer'>
              <div className='flex items-start'>
                <RadioGroupItem value='premium' id='plan-premium' className='mt-1' />
                <div className='ml-2 flex-1'>
                  <Label htmlFor='plan-premium' className='font-medium block'>
                    Premium
                  </Label>
                  <p className='text-sm text-gray-500 mb-1'>Complete solution for large workshops</p>
                  <p className='font-semibold'>₹3,999/month</p>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>

        <Separator className='my-4' />

        <div className='space-y-4'>
          <h3 className='text-sm font-medium'>Payment Method</h3>
          <RadioGroup
            value={settings.paymentMethod}
            onValueChange={value => handleChange('paymentMethod', value)}
            className='space-y-3'
          >
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='credit_card' id='method-card' />
              <Label htmlFor='method-card' className='cursor-pointer'>
                Credit/Debit Card
              </Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='upi' id='method-upi' />
              <Label htmlFor='method-upi' className='cursor-pointer'>
                UPI
              </Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='bank_transfer' id='method-bank' />
              <Label htmlFor='method-bank' className='cursor-pointer'>
                Bank Transfer
              </Label>
            </div>
          </RadioGroup>
        </div>

        <Separator className='my-4' />

        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label htmlFor='autoRenew'>Auto-Renewal</Label>
              <p className='text-sm text-muted-foreground'>Automatically renew subscription when it expires</p>
            </div>
            <Switch
              id='autoRenew'
              checked={settings.autoRenew}
              onCheckedChange={checked => handleChange('autoRenew', checked)}
            />
          </div>

          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label htmlFor='emailReceipts'>Email Receipts</Label>
              <p className='text-sm text-muted-foreground'>Send email receipts for payments</p>
            </div>
            <Switch
              id='emailReceipts'
              checked={settings.emailReceipts}
              onCheckedChange={checked => handleChange('emailReceipts', checked)}
            />
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

export default BillingSettings;
