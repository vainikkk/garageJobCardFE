import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

const GeneralSettings = () => {
  const [settings, setSettings] = useState({
    garageName: '',
    currency: 'INR',
    language: 'en',
    timeZone: 'Asia/Kolkata',
    enableTax: true,
    taxRate: '18',
    enableDiscount: true,
  });

  useEffect(() => {
    // Load settings from localStorage if available
    const savedSettings = localStorage.getItem('generalSettings');
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
    localStorage.setItem('generalSettings', JSON.stringify(settings));

    toast.success('General settings saved successfully!');
  };

  const currencies = [
    { label: 'Indian Rupee (₹)', value: 'INR' },
    { label: 'US Dollar ($)', value: 'USD' },
    { label: 'Euro (€)', value: 'EUR' },
    { label: 'British Pound (£)', value: 'GBP' },
    { label: 'Japanese Yen (¥)', value: 'JPY' },
  ];

  const languages = [
    { label: 'English', value: 'en' },
    { label: 'Hindi', value: 'hi' },
    { label: 'Tamil', value: 'ta' },
    { label: 'Telugu', value: 'te' },
    { label: 'Marathi', value: 'mr' },
  ];

  const timeZones = [
    { label: 'India (GMT+5:30)', value: 'Asia/Kolkata' },
    { label: 'USA Eastern (GMT-5:00)', value: 'America/New_York' },
    { label: 'USA Central (GMT-6:00)', value: 'America/Chicago' },
    { label: 'USA Mountain (GMT-7:00)', value: 'America/Denver' },
    { label: 'USA Pacific (GMT-8:00)', value: 'America/Los_Angeles' },
  ];

  return (
    <Card className='shadow-soft'>
      <CardHeader>
        <CardTitle className='text-garage-primary text-xl'>General Settings</CardTitle>
        <CardDescription>Configure basic settings for your garage management system</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-2'>
          <Label htmlFor='garageName'>Garage Name</Label>
          <Input
            id='garageName'
            value={settings.garageName}
            onChange={e => handleChange('garageName', e.target.value)}
            placeholder='Enter garage name'
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <Label htmlFor='currency'>Currency</Label>
            <Select value={settings.currency} onValueChange={value => handleChange('currency', value)}>
              <SelectTrigger id='currency'>
                <SelectValue placeholder='Select currency' />
              </SelectTrigger>
              <SelectContent>
                {currencies.map(currency => (
                  <SelectItem key={currency.value} value={currency.value}>
                    {currency.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='language'>Language</Label>
            <Select value={settings.language} onValueChange={value => handleChange('language', value)}>
              <SelectTrigger id='language'>
                <SelectValue placeholder='Select language' />
              </SelectTrigger>
              <SelectContent>
                {languages.map(language => (
                  <SelectItem key={language.value} value={language.value}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='timeZone'>Time Zone</Label>
          <Select value={settings.timeZone} onValueChange={value => handleChange('timeZone', value)}>
            <SelectTrigger id='timeZone'>
              <SelectValue placeholder='Select time zone' />
            </SelectTrigger>
            <SelectContent>
              {timeZones.map(timeZone => (
                <SelectItem key={timeZone.value} value={timeZone.value}>
                  {timeZone.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator className='my-4' />

        <div className='space-y-6'>
          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label htmlFor='enableTax'>Enable Tax</Label>
              <p className='text-sm text-muted-foreground'>Add tax calculations to invoices</p>
            </div>
            <Switch
              id='enableTax'
              checked={settings.enableTax}
              onCheckedChange={checked => handleChange('enableTax', checked)}
            />
          </div>

          {settings.enableTax && (
            <div className='space-y-2'>
              <Label htmlFor='taxRate'>Tax Rate (%)</Label>
              <Input
                id='taxRate'
                type='number'
                value={settings.taxRate}
                onChange={e => handleChange('taxRate', e.target.value)}
                placeholder='Enter tax rate'
              />
            </div>
          )}

          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label htmlFor='enableDiscount'>Enable Discounts</Label>
              <p className='text-sm text-muted-foreground'>Allow adding discounts to job cards and invoices</p>
            </div>
            <Switch
              id='enableDiscount'
              checked={settings.enableDiscount}
              onCheckedChange={checked => handleChange('enableDiscount', checked)}
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

export default GeneralSettings;
