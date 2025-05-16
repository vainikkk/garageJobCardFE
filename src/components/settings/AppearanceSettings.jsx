import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

const AppearanceSettings = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    primaryColor: 'blue',
    fontSize: 'normal',
    enableDarkMode: false,
    compactMode: false,
    animationsEnabled: true,
  });

  useEffect(() => {
    // Load settings from localStorage if available
    const savedSettings = localStorage.getItem('appearanceSettings');
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
    localStorage.setItem('appearanceSettings', JSON.stringify(settings));

    // Apply theme changes
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');

    toast.success('Appearance settings saved successfully!');
  };

  const colorOptions = [
    { label: 'Blue', value: 'blue' },
    { label: 'Purple', value: 'purple' },
    { label: 'Green', value: 'green' },
    { label: 'Orange', value: 'orange' },
    { label: 'Red', value: 'red' },
  ];

  const fontSizeOptions = [
    { label: 'Small', value: 'small' },
    { label: 'Normal', value: 'normal' },
    { label: 'Large', value: 'large' },
    { label: 'Extra Large', value: 'xlarge' },
  ];

  return (
    <Card className='shadow-soft'>
      <CardHeader>
        <CardTitle className='text-garage-primary text-xl'>Appearance Settings</CardTitle>
        <CardDescription>Customize the look and feel of your garage management system</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-4'>
          <Label>Theme</Label>
          <RadioGroup
            value={settings.theme}
            onValueChange={value => handleChange('theme', value)}
            className='flex flex-col md:flex-row gap-4'
          >
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='light' id='theme-light' />
              <Label htmlFor='theme-light' className='cursor-pointer'>
                Light
              </Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='dark' id='theme-dark' />
              <Label htmlFor='theme-dark' className='cursor-pointer'>
                Dark
              </Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='system' id='theme-system' />
              <Label htmlFor='theme-system' className='cursor-pointer'>
                System Default
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='primaryColor'>Primary Color</Label>
          <Select value={settings.primaryColor} onValueChange={value => handleChange('primaryColor', value)}>
            <SelectTrigger id='primaryColor'>
              <SelectValue placeholder='Select primary color' />
            </SelectTrigger>
            <SelectContent>
              {colorOptions.map(color => (
                <SelectItem key={color.value} value={color.value}>
                  {color.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='fontSize'>Font Size</Label>
          <Select value={settings.fontSize} onValueChange={value => handleChange('fontSize', value)}>
            <SelectTrigger id='fontSize'>
              <SelectValue placeholder='Select font size' />
            </SelectTrigger>
            <SelectContent>
              {fontSizeOptions.map(size => (
                <SelectItem key={size.value} value={size.value}>
                  {size.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator className='my-4' />

        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label htmlFor='enableDarkMode'>Dark Mode</Label>
              <p className='text-sm text-muted-foreground'>Enable dark mode for the application</p>
            </div>
            <Switch
              id='enableDarkMode'
              checked={settings.enableDarkMode}
              onCheckedChange={checked => handleChange('enableDarkMode', checked)}
            />
          </div>

          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label htmlFor='compactMode'>Compact Mode</Label>
              <p className='text-sm text-muted-foreground'>Reduce spacing for a more compact view</p>
            </div>
            <Switch
              id='compactMode'
              checked={settings.compactMode}
              onCheckedChange={checked => handleChange('compactMode', checked)}
            />
          </div>

          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label htmlFor='animationsEnabled'>Animations</Label>
              <p className='text-sm text-muted-foreground'>Enable animations throughout the application</p>
            </div>
            <Switch
              id='animationsEnabled'
              checked={settings.animationsEnabled}
              onCheckedChange={checked => handleChange('animationsEnabled', checked)}
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

export default AppearanceSettings;
