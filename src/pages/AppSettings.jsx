import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Settings, Palette, FileText, Bell, Shield, CreditCard } from 'lucide-react';
import GeneralSettings from '../components/settings/GeneralSettings';
import AppearanceSettings from '../components/settings/AppearanceSettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import BillingSettings from '../components/settings/BillingSettings';

const AppSettings = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <PageLayout>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 animate-fade-in'>
        <div>
          <h1 className='text-2xl sm:text-3xl font-bold text-garage-text mb-1'>Application Settings</h1>
          <p className='text-gray-500'>Customize your garage management system</p>
        </div>
      </div>

      <Tabs defaultValue='general' value={activeTab} onValueChange={setActiveTab} className='w-full'>
        <div className='flex flex-col sm:flex-row gap-6'>
          <div className='flex-shrink-0 w-full sm:w-64 mb-6 sm:mb-0'>
            <Card className='shadow-soft sticky top-20'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-garage-primary text-lg flex items-center'>
                  <Settings className='mr-2 h-5 w-5' />
                  Settings
                </CardTitle>
                <CardDescription>Customize your garage management system</CardDescription>
              </CardHeader>
              <CardContent className='pt-2'>
                <TabsList className='flex flex-col justify-start items-stretch h-auto bg-transparent space-y-1'>
                  <TabsTrigger
                    value='general'
                    className={`justify-start px-3 py-2 h-auto data-[state=active]:bg-garage-primary/10 data-[state=active]:text-garage-primary`}
                  >
                    <Settings className='mr-2 h-4 w-4' />
                    General
                  </TabsTrigger>
                  <TabsTrigger
                    value='appearance'
                    className='justify-start px-3 py-2 h-auto data-[state=active]:bg-garage-primary/10 data-[state=active]:text-garage-primary'
                  >
                    <Palette className='mr-2 h-4 w-4' />
                    Appearance
                  </TabsTrigger>
                  <TabsTrigger
                    value='documents'
                    className='justify-start px-3 py-2 h-auto data-[state=active]:bg-garage-primary/10 data-[state=active]:text-garage-primary'
                  >
                    <FileText className='mr-2 h-4 w-4' />
                    Documents
                  </TabsTrigger>
                  <TabsTrigger
                    value='notifications'
                    className='justify-start px-3 py-2 h-auto data-[state=active]:bg-garage-primary/10 data-[state=active]:text-garage-primary'
                  >
                    <Bell className='mr-2 h-4 w-4' />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger
                    value='security'
                    className='justify-start px-3 py-2 h-auto data-[state=active]:bg-garage-primary/10 data-[state=active]:text-garage-primary'
                  >
                    <Shield className='mr-2 h-4 w-4' />
                    Security
                  </TabsTrigger>
                  <TabsTrigger
                    value='billing'
                    className='justify-start px-3 py-2 h-auto data-[state=active]:bg-garage-primary/10 data-[state=active]:text-garage-primary'
                  >
                    <CreditCard className='mr-2 h-4 w-4' />
                    Billing
                  </TabsTrigger>
                </TabsList>
              </CardContent>
            </Card>
          </div>

          <div className='flex-1'>
            <TabsContent value='general' className='mt-0'>
              <GeneralSettings />
            </TabsContent>

            <TabsContent value='appearance' className='mt-0'>
              <AppearanceSettings />
            </TabsContent>

            <TabsContent value='documents' className='mt-0'>
              <Card className='shadow-soft'>
                <CardHeader>
                  <CardTitle className='text-garage-primary text-xl'>Document Templates</CardTitle>
                  <CardDescription>Customize your invoice, receipt and job card templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className='text-muted-foreground'>
                    This section allows you to customize document templates. You can update the layout, add your logo,
                    and customize text.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='notifications' className='mt-0'>
              <NotificationSettings />
            </TabsContent>

            <TabsContent value='security' className='mt-0'>
              <SecuritySettings />
            </TabsContent>

            <TabsContent value='billing' className='mt-0'>
              <BillingSettings />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </PageLayout>
  );
};

export default AppSettings;
