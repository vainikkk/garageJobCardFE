import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import PredefinedServicesList from '../components/services/PredefinedServicesList';
import ServiceItem from '../components/services/ServiceItem';
import CustomServiceDialog from '../components/services/CustomServiceDialog';
import ActionsMenu from '../components/jobcard/ActionsMenu';
import AdvancedFeatures from '../components/jobcard/AdvancedFeatures';

// Predefined Indian bike models
const indianBikeModels = {
  Hero: ['Splendor', 'Passion', 'HF Deluxe', 'Glamour', 'Xtreme', 'Xpulse'],
  Bajaj: ['Pulsar', 'Dominar', 'Avenger', 'Platina', 'CT', 'Discover'],
  TVS: ['Apache', 'Jupiter', 'XL', 'Ntorq', 'iQube', 'Raider'],
  'Royal Enfield': ['Classic 350', 'Bullet 350', 'Meteor 350', 'Hunter 350', 'Himalayan', 'Continental GT'],
  Honda: ['Activa', 'Shine', 'Unicorn', 'CB', 'Dio', 'Hornet'],
  Yamaha: ['R15', 'FZ', 'MT-15', 'Fascino', 'Ray ZR', 'Aerox'],
  Suzuki: ['Access', 'Gixxer', 'Burgman', 'Avenis', 'V-Strom', 'Hayabusa'],
  KTM: ['Duke 125', 'Duke 200', 'Duke 390', 'RC 125', 'RC 200', 'RC 390'],
};

// Years for vehicle selection
const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString());

const JobCardNew = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('customer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPredefinedServices, setShowPredefinedServices] = useState(false);
  const [showCustomService, setShowCustomService] = useState(false);
  const [jobCardSaved, setJobCardSaved] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    // Customer info
    customerName: '',
    mobileNumber: '',
    email: '',
    alternateContact: '',
    address: '',

    // Vehicle info
    make: '',
    model: '',
    year: '',
    registrationNumber: '',
    engineNumber: '',
    chassisNumber: '',
    odometerReading: '',
    fuelLevel: '',

    // Service info
    serviceDate: new Date().toISOString().split('T')[0],
    estimatedCompletionDate: '',
    assignedMechanic: '',
    serviceNotes: '',
  });

  // Services state
  const [selectedServices, setSelectedServices] = useState([]);

  // Vehicle models based on selected make
  const [availableModels, setAvailableModels] = useState([]);

  const handleNextTab = () => {
    if (activeTab === 'customer') setActiveTab('vehicle');
    else if (activeTab === 'vehicle') setActiveTab('service');
  };

  const handlePreviousTab = () => {
    if (activeTab === 'service') setActiveTab('vehicle');
    else if (activeTab === 'vehicle') setActiveTab('customer');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // If make changes, update available models
    if (field === 'make' && indianBikeModels[value]) {
      setAvailableModels(indianBikeModels[value]);
      // Reset model when make changes
      setFormData(prev => ({
        ...prev,
        model: '',
      }));
    }
  };

  const handleSaveJobCard = () => {
    setIsSubmitting(true);

    // Validate required fields
    const requiredFields = {
      customerName: 'Customer Name',
      mobileNumber: 'Mobile Number',
      make: 'Vehicle Make',
      model: 'Vehicle Model',
      registrationNumber: 'Registration Number',
      odometerReading: 'Odometer Reading',
      fuelLevel: 'Fuel Level',
      serviceDate: 'Service Date',
    };

    let isValid = true;
    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!formData[field]) {
        toast.error(`${label} is required`);
        isValid = false;
      }
    });

    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    // In a real app, this would save to a database
    setTimeout(() => {
      toast.success('Job card created successfully', {
        description: `Job card for ${formData.customerName}'s ${formData.make} ${formData.model} has been created`,
      });
      setIsSubmitting(false);
      // Set job card as saved
      setJobCardSaved(true);
    }, 1500);
  };

  const handlePredefinedServices = services => {
    setSelectedServices(services);
  };

  const handleCustomService = service => {
    setSelectedServices(prev => [...prev, service]);
  };

  const handleRemoveService = id => {
    setSelectedServices(prev => prev.filter(service => service.id !== id));
  };

  const getTotalAmount = () => {
    return selectedServices.reduce((total, service) => total + service.price, 0);
  };

  return (
    <PageLayout>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-900 mb-2'>Create New Job Card</h1>
        <p className='text-gray-500'>Enter details to create a new job card</p>
      </div>

      <Card className='p-6'>
        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
          <TabsList className='grid w-full grid-cols-3 mb-6'>
            <TabsTrigger value='customer'>Customer Info</TabsTrigger>
            <TabsTrigger value='vehicle'>Vehicle Info</TabsTrigger>
            <TabsTrigger value='service'>Service Details</TabsTrigger>
          </TabsList>

          <TabsContent value='customer' className='animate-fade-in'>
            <div className='space-y-4 max-w-2xl'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='name'>Customer Name*</Label>
                  <Input
                    id='name'
                    placeholder='Enter customer name'
                    value={formData.customerName}
                    onChange={e => handleInputChange('customerName', e.target.value)}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='mobile'>Mobile Number*</Label>
                  <Input
                    id='mobile'
                    placeholder='Enter mobile number'
                    value={formData.mobileNumber}
                    onChange={e => handleInputChange('mobileNumber', e.target.value)}
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='Enter email address'
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='alt-contact'>Alternative Contact</Label>
                  <Input
                    id='alt-contact'
                    placeholder='Enter alternative contact'
                    value={formData.alternateContact}
                    onChange={e => handleInputChange('alternateContact', e.target.value)}
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='address'>Address</Label>
                <Input
                  id='address'
                  placeholder='Enter address'
                  value={formData.address}
                  onChange={e => handleInputChange('address', e.target.value)}
                />
              </div>

              <div className='flex justify-end mt-6'>
                <Button onClick={handleNextTab} className='bg-garage-primary'>
                  Next <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='vehicle' className='animate-fade-in'>
            <div className='space-y-4 max-w-2xl'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='make'>Make*</Label>
                  <Select value={formData.make} onValueChange={value => handleInputChange('make', value)}>
                    <SelectTrigger id='make'>
                      <SelectValue placeholder='Select vehicle make' />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(indianBikeModels).map(make => (
                        <SelectItem key={make} value={make}>
                          {make}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='model'>Model*</Label>
                  <Select
                    value={formData.model}
                    onValueChange={value => handleInputChange('model', value)}
                    disabled={!formData.make}
                  >
                    <SelectTrigger id='model'>
                      <SelectValue placeholder={formData.make ? 'Select model' : 'Select make first'} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableModels.map(model => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='year'>Year</Label>
                  <Select value={formData.year} onValueChange={value => handleInputChange('year', value)}>
                    <SelectTrigger id='year'>
                      <SelectValue placeholder='Select year' />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='reg-number'>Registration Number*</Label>
                  <Input
                    id='reg-number'
                    placeholder='Enter registration number'
                    value={formData.registrationNumber}
                    onChange={e => handleInputChange('registrationNumber', e.target.value)}
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='engine-number'>Engine Number</Label>
                  <Input
                    id='engine-number'
                    placeholder='Enter engine number'
                    value={formData.engineNumber}
                    onChange={e => handleInputChange('engineNumber', e.target.value)}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='chassis-number'>Chassis Number</Label>
                  <Input
                    id='chassis-number'
                    placeholder='Enter chassis number'
                    value={formData.chassisNumber}
                    onChange={e => handleInputChange('chassisNumber', e.target.value)}
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='odometer'>Odometer Reading*</Label>
                  <Input
                    id='odometer'
                    placeholder='Enter current odometer reading'
                    value={formData.odometerReading}
                    onChange={e => handleInputChange('odometerReading', e.target.value)}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='fuel-level'>Fuel Level*</Label>
                  <Select value={formData.fuelLevel} onValueChange={value => handleInputChange('fuelLevel', value)}>
                    <SelectTrigger id='fuel-level'>
                      <SelectValue placeholder='Select fuel level' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='empty'>Empty</SelectItem>
                      <SelectItem value='low'>Low</SelectItem>
                      <SelectItem value='quarter'>Quarter</SelectItem>
                      <SelectItem value='half'>Half</SelectItem>
                      <SelectItem value='three-quarter'>Three-Quarter</SelectItem>
                      <SelectItem value='full'>Full</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='flex justify-between mt-6'>
                <Button variant='outline' onClick={handlePreviousTab}>
                  <ArrowLeft className='mr-2 h-4 w-4' /> Previous
                </Button>
                <Button onClick={handleNextTab} className='bg-garage-primary'>
                  Next <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='service' className='animate-fade-in'>
            <div className='space-y-4 max-w-2xl'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='service-date'>Service Date*</Label>
                  <Input
                    id='service-date'
                    type='date'
                    value={formData.serviceDate}
                    onChange={e => handleInputChange('serviceDate', e.target.value)}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='est-completion'>Estimated Completion Date*</Label>
                  <Input
                    id='est-completion'
                    type='date'
                    value={formData.estimatedCompletionDate}
                    onChange={e => handleInputChange('estimatedCompletionDate', e.target.value)}
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='mechanic'>Assigned Mechanic</Label>
                  <Select
                    value={formData.assignedMechanic}
                    onValueChange={value => handleInputChange('assignedMechanic', value)}
                  >
                    <SelectTrigger id='mechanic'>
                      <SelectValue placeholder='Select mechanic' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='1'>John Doe</SelectItem>
                      <SelectItem value='2'>Jane Smith</SelectItem>
                      <SelectItem value='3'>Mike Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='service-notes'>Service Notes</Label>
                <textarea
                  id='service-notes'
                  className='flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  placeholder='Enter service details and notes'
                  value={formData.serviceNotes}
                  onChange={e => handleInputChange('serviceNotes', e.target.value)}
                ></textarea>
              </div>

              <div className='mt-6'>
                <div className='flex justify-between items-center mb-4'>
                  <h3 className='text-lg font-semibold'>Services</h3>
                  <div className='flex gap-2'>
                    <Button
                      variant='outline'
                      className='text-garage-primary'
                      onClick={() => setShowPredefinedServices(true)}
                    >
                      + Add Predefined Service
                    </Button>
                    <Button
                      variant='outline'
                      className='text-garage-primary'
                      onClick={() => setShowCustomService(true)}
                    >
                      + Add Custom Service
                    </Button>
                  </div>
                </div>

                {selectedServices.length > 0 ? (
                  <div className='bg-white border rounded-md p-4'>
                    <div className='space-y-4'>
                      {selectedServices.map(service => (
                        <ServiceItem key={service.id} service={service} onRemove={handleRemoveService} />
                      ))}
                      <div className='flex justify-between pt-3 mt-3 border-t'>
                        <span className='font-semibold'>Total Amount</span>
                        <span className='font-semibold'>₹{getTotalAmount()}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='bg-gray-50 p-6 rounded-md text-center'>
                    <p className='text-gray-500'>No services added yet</p>
                    <p className='text-sm text-gray-400 mt-2'>Add a predefined or custom service above</p>
                  </div>
                )}
              </div>

              {/* Add the new advanced features component */}
              <div className='mt-6 pt-6 border-t'>
                <h3 className='text-lg font-semibold mb-4'>Advanced Options</h3>
                <AdvancedFeatures />
              </div>

              <div className='flex justify-between mt-6'>
                <Button variant='outline' onClick={handlePreviousTab}>
                  <ArrowLeft className='mr-2 h-4 w-4' /> Previous
                </Button>
                <Button className='bg-garage-accent' onClick={handleSaveJobCard} disabled={isSubmitting}>
                  <Save className='mr-2 h-4 w-4' />
                  {isSubmitting ? 'Saving...' : 'Save Job Card'}
                </Button>
              </div>
            </div>

            {/* Show action buttons after job card is saved */}
            {jobCardSaved && (
              <div className='mt-6 pt-6 border-t'>
                <div className='flex justify-between items-center'>
                  <h3 className='text-lg font-semibold'>Job Card Created Successfully</h3>
                  <div className='flex gap-2'>
                    {/* Replace individual buttons with our new ActionsMenu component */}
                    <ActionsMenu
                      jobCardData={{
                        customerName: formData.customerName,
                        vehicleInfo: `${formData.make} ${formData.model} (${formData.registrationNumber})`,
                        services: selectedServices.map(s => ({ name: s.name, price: s.price })),
                        totalAmount: getTotalAmount(),
                        jobCardId: Date.now().toString().substring(7),
                      }}
                    />
                    <Button className='bg-garage-primary' onClick={() => navigate('/job-cards')}>
                      View All Job Cards
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>

      {/* Predefined Services Dialog */}
      <PredefinedServicesList
        open={showPredefinedServices}
        onOpenChange={setShowPredefinedServices}
        onSelectServices={handlePredefinedServices}
      />

      {/* Custom Service Dialog */}
      <CustomServiceDialog
        open={showCustomService}
        onOpenChange={setShowCustomService}
        onAddCustomService={handleCustomService}
      />
    </PageLayout>
  );
};

export default JobCardNew;
