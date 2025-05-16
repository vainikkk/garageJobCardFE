import { useState } from 'react';
import { Button } from '../ui/button';
import { Camera, Clipboard, Car, Clock, Calendar, Bell, Phone, ListChecks, Tag } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { toast } from 'sonner';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

export default function AdvancedFeatures() {
  const [vehiclePhotos, setVehiclePhotos] = useState([]);
  const [showReminderOptions, setShowReminderOptions] = useState(false);
  const [reminderDays, setReminderDays] = useState(30);

  const handleTakePhoto = () => {
    toast.info('Camera functionality will be available in the mobile app');
  };

  const handleUploadPhoto = e => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, this would upload the file to a server
      toast.success(`${e.target.files.length} photo(s) added`);

      // For demo purposes, we'll just add placeholder images
      setVehiclePhotos(prev => [
        ...prev,
        // ...Array(e.target.files!.length).fill("/placeholder.svg")
      ]);
    }
  };

  const handleSetReminder = () => {
    toast.success(`Service reminder set for ${reminderDays} days`);
  };

  return (
    <Accordion type='single' collapsible className='w-full'>
      <AccordionItem value='vehicle-photos'>
        <AccordionTrigger className='hover:bg-gray-50 px-3 rounded-lg'>
          <div className='flex items-center gap-2'>
            <Camera className='h-5 w-5 text-garage-primary' />
            <span>Vehicle Inspection Photos</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className='px-3'>
          <div className='space-y-4'>
            <p className='text-sm text-gray-500'>Document the vehicle condition before service.</p>

            <div className='flex flex-wrap gap-3'>
              <Button size='sm' onClick={handleTakePhoto} className='gap-2'>
                <Camera className='h-4 w-4' /> Take Photo
              </Button>
              <Button size='sm' variant='outline' className='gap-2' asChild>
                <label>
                  <input type='file' accept='image/*' multiple className='hidden' onChange={handleUploadPhoto} />
                  <span>Upload Photos</span>
                </label>
              </Button>
            </div>

            {vehiclePhotos.length > 0 && (
              <div className='grid grid-cols-3 sm:grid-cols-4 gap-3 mt-3'>
                {vehiclePhotos.map((photo, index) => (
                  <div key={index} className='aspect-square rounded-lg overflow-hidden bg-gray-100 border'>
                    {/* // eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                    <img src={photo} alt={`Vehicle ${index + 1}`} className='w-full h-full object-cover' />
                  </div>
                ))}
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value='checklist'>
        <AccordionTrigger className='hover:bg-gray-50 px-3 rounded-lg'>
          <div className='flex items-center gap-2'>
            <Clipboard className='h-5 w-5 text-garage-primary' />
            <span>Service Checklist</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className='px-3'>
          <div className='space-y-4'>
            <p className='text-sm text-gray-500'>Mark completed service items.</p>

            <div className='space-y-3'>
              {['Engine oil check', 'Brake check', 'Filter inspection', 'Lights check', 'Tire pressure'].map(
                (item, i) => (
                  <div key={i} className='flex items-center space-x-2'>
                    <input
                      type='checkbox'
                      id={`check-${i}`}
                      className='h-4 w-4 rounded border-gray-300 text-garage-primary focus:ring-garage-primary'
                    />
                    <label htmlFor={`check-${i}`} className='text-sm font-medium'>
                      {item}
                    </label>
                  </div>
                )
              )}

              <Button size='sm' variant='outline' className='w-full mt-2'>
                <ListChecks className='h-4 w-4 mr-2' /> Add Custom Check Item
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value='service-reminders'>
        <AccordionTrigger className='hover:bg-gray-50 px-3 rounded-lg'>
          <div className='flex items-center gap-2'>
            <Bell className='h-5 w-5 text-garage-primary' />
            <span>Service Reminders</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className='px-3'>
          <div className='space-y-4'>
            <p className='text-sm text-gray-500'>Set automatic reminders for the next service.</p>

            <div className='flex items-center space-x-2'>
              <Switch id='send-reminder' checked={showReminderOptions} onCheckedChange={setShowReminderOptions} />
              <Label htmlFor='send-reminder'>Set service reminder</Label>
            </div>

            {showReminderOptions && (
              <div className='space-y-3 pt-2'>
                <div className='grid grid-cols-2 gap-3'>
                  <div>
                    <Label htmlFor='reminder-days' className='text-sm'>
                      Days until reminder
                    </Label>
                    <select
                      id='reminder-days'
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50'
                      value={reminderDays}
                      onChange={e => setReminderDays(Number(e.target.value))}
                    >
                      <option value='30'>30 days</option>
                      <option value='60'>60 days</option>
                      <option value='90'>90 days</option>
                      <option value='180'>6 months</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor='reminder-type' className='text-sm'>
                      Reminder type
                    </Label>
                    <select
                      id='reminder-type'
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50'
                    >
                      <option value='sms'>SMS</option>
                      <option value='whatsapp'>WhatsApp</option>
                      <option value='both'>Both</option>
                    </select>
                  </div>
                </div>

                <Button size='sm' onClick={handleSetReminder}>
                  <Calendar className='h-4 w-4 mr-2' /> Set Reminder
                </Button>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value='customer-feedback'>
        <AccordionTrigger className='hover:bg-gray-50 px-3 rounded-lg'>
          <div className='flex items-center gap-2'>
            <Phone className='h-5 w-5 text-garage-primary' />
            <span>Customer Feedback</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className='px-3'>
          <div className='space-y-3'>
            <p className='text-sm text-gray-500'>Record customer comments and concerns.</p>

            <Textarea placeholder='Enter customer comments here...' className='min-h-[100px]' />

            <div className='flex items-center gap-2'>
              <span className='text-sm'>Satisfaction:</span>
              {[1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  className='h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100'
                >
                  {rating}
                </button>
              ))}
            </div>

            <Button size='sm'>Save Feedback</Button>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value='warranty-info'>
        <AccordionTrigger className='hover:bg-gray-50 px-3 rounded-lg'>
          <div className='flex items-center gap-2'>
            <Tag className='h-5 w-5 text-garage-primary' />
            <span>Warranty Information</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className='px-3'>
          <div className='space-y-3'>
            <p className='text-sm text-gray-500'>Record warranty details for parts and service.</p>

            <div className='space-y-2'>
              <Label className='text-sm'>Warranty Period</Label>
              <div className='flex gap-2'>
                <input
                  type='number'
                  className='w-20 rounded-md border border-input bg-background px-3 py-2 text-sm'
                  min='1'
                  defaultValue='3'
                />
                <select className='rounded-md border border-input bg-background px-3 py-2 text-sm'>
                  <option value='months'>Months</option>
                  <option value='years'>Years</option>
                </select>
              </div>
            </div>

            <Textarea
              placeholder='Enter warranty terms and conditions...'
              className='min-h-[80px]'
              defaultValue='Standard 3 months warranty on parts and labor.'
            />

            <Button size='sm'>Save Warranty Info</Button>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value='mileage-tracking'>
        <AccordionTrigger className='hover:bg-gray-50 px-3 rounded-lg'>
          <div className='flex items-center gap-2'>
            <Car className='h-5 w-5 text-garage-primary' />
            <span>Mileage Tracking</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className='px-3'>
          <div className='space-y-3'>
            <p className='text-sm text-gray-500'>Record and track vehicle mileage history.</p>

            <div className='flex gap-2'>
              <div className='w-full'>
                <Label className='text-xs'>Current Mileage (km)</Label>
                <input
                  type='number'
                  className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                  defaultValue='32580'
                />
              </div>
              <div className='w-full'>
                <Label className='text-xs'>Last Service (km)</Label>
                <input
                  type='number'
                  className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                  defaultValue='28450'
                  disabled
                />
              </div>
            </div>

            <div className='bg-gray-50 p-3 rounded-md'>
              <p className='text-xs font-medium'>
                Next service recommended at: <span className='text-garage-primary'>35000 km</span>
              </p>
            </div>

            <Button size='sm'>Update Mileage</Button>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value='service-history'>
        <AccordionTrigger className='hover:bg-gray-50 px-3 rounded-lg'>
          <div className='flex items-center gap-2'>
            <Clock className='h-5 w-5 text-garage-primary' />
            <span>Service Timeline</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className='px-3'>
          <div className='space-y-3'>
            <p className='text-sm text-gray-500'>View complete service history for this vehicle.</p>

            <div className='space-y-4'>
              <div className='relative pl-6 pb-4 border-l-2 border-garage-primary'>
                <div className='absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-garage-primary'></div>
                <p className='text-sm font-medium'>Oil Change & Filter Replacement</p>
                <p className='text-xs text-gray-500'>15 Apr 2023 • 28,450 km</p>
              </div>

              <div className='relative pl-6 pb-4 border-l-2 border-gray-200'>
                <div className='absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-gray-200'></div>
                <p className='text-sm font-medium'>Brake Pad Replacement</p>
                <p className='text-xs text-gray-500'>22 Jan 2023 • 24,120 km</p>
              </div>

              <div className='relative pl-6 border-l-2 border-gray-200'>
                <div className='absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-gray-200'></div>
                <p className='text-sm font-medium'>Annual Service</p>
                <p className='text-xs text-gray-500'>10 Oct 2022 • 18,540 km</p>
              </div>
            </div>

            <Button size='sm' variant='outline' className='w-full'>
              View Full History
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
