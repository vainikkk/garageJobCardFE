import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

const SecuritySettings = () => {
  const [settings, setSettings] = useState({
    twoFactorAuth: false,
    passwordExpiry: '90',
    sessionTimeout: '30',
    loginAttempts: '5',
    dataEncryption: true,
  });

  useEffect(() => {
    // Load settings from localStorage if available
    const savedSettings = localStorage.getItem('securitySettings');
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
    localStorage.setItem('securitySettings', JSON.stringify(settings));

    toast.success('Security settings saved successfully!');
  };

  const passwordExpiryOptions = [
    { label: 'Never', value: 'never' },
    { label: '30 days', value: '30' },
    { label: '60 days', value: '60' },
    { label: '90 days', value: '90' },
    { label: '180 days', value: '180' },
  ];

  const sessionTimeoutOptions = [
    { label: '15 minutes', value: '15' },
    { label: '30 minutes', value: '30' },
    { label: '1 hour', value: '60' },
    { label: '2 hours', value: '120' },
    { label: '4 hours', value: '240' },
  ];

  return (
    <Card className='shadow-soft'>
      <CardHeader>
        <CardTitle className='text-garage-primary text-xl'>Security Settings</CardTitle>
        <CardDescription>Configure security settings for your garage management system</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <Label htmlFor='twoFactorAuth'>Two-Factor Authentication</Label>
            <p className='text-sm text-muted-foreground'>Enable two-factor authentication for additional security</p>
          </div>
          <Switch
            id='twoFactorAuth'
            checked={settings.twoFactorAuth}
            onCheckedChange={checked => handleChange('twoFactorAuth', checked)}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='passwordExpiry'>Password Expiry</Label>
          <Select value={settings.passwordExpiry} onValueChange={value => handleChange('passwordExpiry', value)}>
            <SelectTrigger id='passwordExpiry'>
              <SelectValue placeholder='Select password expiry period' />
            </SelectTrigger>
            <SelectContent>
              {passwordExpiryOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className='text-sm text-muted-foreground'>How often users need to change their passwords</p>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='sessionTimeout'>Session Timeout</Label>
          <Select value={settings.sessionTimeout} onValueChange={value => handleChange('sessionTimeout', value)}>
            <SelectTrigger id='sessionTimeout'>
              <SelectValue placeholder='Select session timeout period' />
            </SelectTrigger>
            <SelectContent>
              {sessionTimeoutOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className='text-sm text-muted-foreground'>How long until an inactive user is logged out</p>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='loginAttempts'>Failed Login Attempts</Label>
          <Input
            id='loginAttempts'
            type='number'
            value={settings.loginAttempts}
            onChange={e => handleChange('loginAttempts', e.target.value)}
            placeholder='Enter number of allowed login attempts'
          />
          <p className='text-sm text-muted-foreground'>Number of failed login attempts before account is locked</p>
        </div>

        <Separator className='my-4' />

        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <Label htmlFor='dataEncryption'>Data Encryption</Label>
            <p className='text-sm text-muted-foreground'>Enable encryption for sensitive data</p>
          </div>
          <Switch
            id='dataEncryption'
            checked={settings.dataEncryption}
            onCheckedChange={checked => handleChange('dataEncryption', checked)}
          />
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

export default SecuritySettings;
