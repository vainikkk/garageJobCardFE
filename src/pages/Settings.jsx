import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import GarageDetails from '../components/settings/GarageDetails';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Settings as SettingsIcon, Building, Bell, Shield, User, CreditCard } from 'lucide-react';
import { Separator } from '../components/ui/separator';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('garage');

  const handleSaveGarageDetails = data => {
    console.log('Saved garage details:', data);
    // Here you would typically send this to your backend API
  };

  return (
    <PageLayout>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 animate-fade-in'>
        <div>
          <h1 className='text-2xl sm:text-3xl font-bold text-garage-text mb-1'>Settings</h1>
          <p className='text-gray-500'>Manage your garage preferences and business details</p>
        </div>
      </div>

      <Tabs defaultValue='garage' value={activeTab} onValueChange={setActiveTab} className='w-full'>
        <div className='flex flex-col sm:flex-row gap-6'>
          <div className='flex-shrink-0 w-full sm:w-64 mb-6 sm:mb-0'>
            <Card className='shadow-soft sticky top-20'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-garage-primary text-lg flex items-center'>
                  <SettingsIcon className='mr-2 h-5 w-5' />
                  Settings
                </CardTitle>
                <CardDescription>Manage your account settings and preferences.</CardDescription>
              </CardHeader>
              <CardContent className='pt-2'>
                <TabsList className='flex flex-col justify-start items-stretch h-auto bg-transparent space-y-1'>
                  <TabsTrigger
                    value='garage'
                    className={`justify-start px-3 py-2 h-auto data-[state=active]:bg-garage-primary/10 data-[state=active]:text-garage-primary`}
                  >
                    <Building className='mr-2 h-4 w-4' />
                    Garage Details
                  </TabsTrigger>
                  <TabsTrigger
                    value='user'
                    className='justify-start px-3 py-2 h-auto data-[state=active]:bg-garage-primary/10 data-[state=active]:text-garage-primary'
                  >
                    <User className='mr-2 h-4 w-4' />
                    User Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value='notifications'
                    className='justify-start px-3 py-2 h-auto data-[state=active]:bg-garage-primary/10 data-[state=active]:text-garage-primary'
                  >
                    <Bell className='mr-2 h-4 w-4' />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger
                    value='billing'
                    className='justify-start px-3 py-2 h-auto data-[state=active]:bg-garage-primary/10 data-[state=active]:text-garage-primary'
                  >
                    <CreditCard className='mr-2 h-4 w-4' />
                    Billing
                  </TabsTrigger>
                  <TabsTrigger
                    value='security'
                    className='justify-start px-3 py-2 h-auto data-[state=active]:bg-garage-primary/10 data-[state=active]:text-garage-primary'
                  >
                    <Shield className='mr-2 h-4 w-4' />
                    Security
                  </TabsTrigger>
                </TabsList>
              </CardContent>
            </Card>
          </div>

          <div className='flex-1'>
            <TabsContent value='garage' className='mt-0'>
              <GarageDetails onSave={handleSaveGarageDetails} />
            </TabsContent>

            <TabsContent value='user' className='mt-0'>
              <Card className='shadow-soft'>
                <CardHeader>
                  <CardTitle className='text-garage-primary text-xl'>User Profile</CardTitle>
                  <CardDescription>Manage your personal information and account details</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className='text-muted-foreground'>
                    This section will allow you to update your user profile information.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='notifications' className='mt-0'>
              <Card className='shadow-soft'>
                <CardHeader>
                  <CardTitle className='text-garage-primary text-xl'>Notifications</CardTitle>
                  <CardDescription>Configure your notification preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className='text-muted-foreground'>
                    This section will allow you to manage your notification settings.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='billing' className='mt-0'>
              <Card className='shadow-soft'>
                <CardHeader>
                  <CardTitle className='text-garage-primary text-xl'>Billing & Subscription</CardTitle>
                  <CardDescription>Manage your billing information and subscription plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className='text-muted-foreground'>
                    This section will allow you to manage your billing settings and subscription plan.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='security' className='mt-0'>
              <Card className='shadow-soft'>
                <CardHeader>
                  <CardTitle className='text-garage-primary text-xl'>Security Settings</CardTitle>
                  <CardDescription>Manage your account security and password</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className='text-muted-foreground'>
                    This section will allow you to update your security settings and change your password.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </PageLayout>
  );
};

export default Settings;
