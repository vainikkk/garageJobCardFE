import { useState, useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Plus } from 'lucide-react';
import { PredefinedService } from '../components/services/PredefinedServicesList';
import { useToast } from '../hooks/use-toast';
import ServiceForm from '../components/services/ServiceForm';
import ServiceList from '../components/services/ServiceList';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all-services');
  const [services, setServices] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [selectMode, setSelectMode] = useState(false);
  const { toast } = useToast();

  // Fetch services (mock data for now)
  useEffect(() => {
    // In a real application, this would fetch from an API
    const fetchServices = async () => {
      try {
        // For now, use the sample data from ServiceData
        const { predefinedServicesData } = await import('../components/services/ServiceData');

        // Load any additional services from localStorage
        const storedServices = localStorage.getItem('customServices');
        const customServices = storedServices ? JSON.parse(storedServices) : [];

        // Combine predefined and custom services
        setServices([...predefinedServicesData, ...customServices]);
      } catch (error) {
        console.error('Failed to fetch services:', error);
        toast({
          title: 'Error',
          description: 'Failed to load services',
          variant: 'destructive',
        });
      }
    };

    fetchServices();
  }, [toast]);

  const handleAddService = service => {
    // In a real app, this would send to an API
    const newService = {
      ...service,
      id: `service-${Date.now()}`, // Generate unique ID
    };

    setServices(prev => [...prev, newService]);
    setIsFormOpen(false);

    // Store custom services in localStorage
    const storedServices = localStorage.getItem('customServices');
    const customServices = storedServices ? JSON.parse(storedServices) : [];
    localStorage.setItem('customServices', JSON.stringify([...customServices, newService]));

    toast({
      title: 'Success',
      description: 'Service added successfully',
    });
  };

  const handleEditService = service => {
    setServices(prev => prev.map(s => (s.id === service.id ? service : s)));

    setEditingService(null);

    // Update custom services in localStorage
    const storedServices = localStorage.getItem('customServices');
    if (storedServices) {
      const customServices = JSON.parse(storedServices);
      const updatedCustomServices = customServices.map(s => (s.id === service.id ? service : s));
      localStorage.setItem('customServices', JSON.stringify(updatedCustomServices));
    }

    toast({
      title: 'Success',
      description: 'Service updated successfully',
    });
  };

  const handleDeleteService = id => {
    setServices(prev => prev.filter(service => service.id !== id));

    // Remove from custom services in localStorage
    const storedServices = localStorage.getItem('customServices');
    if (storedServices) {
      const customServices = JSON.parse(storedServices);
      const updatedCustomServices = customServices.filter(s => s.id !== id);
      localStorage.setItem('customServices', JSON.stringify(updatedCustomServices));
    }

    toast({
      title: 'Success',
      description: 'Service deleted successfully',
    });
  };

  const startEditService = service => {
    setEditingService(service);
    setIsFormOpen(true);
  };

  const handleSelectServices = selectedServices => {
    // Store selected services in localStorage for use in job card creation
    localStorage.setItem('selectedServices', JSON.stringify(selectedServices));

    toast({
      title: 'Services Selected',
      description: `${selectedServices.length} services have been selected for job card`,
    });

    // Navigate to job card creation
    navigate('/job-card/new');
  };

  const filteredServices =
    activeTab === 'all-services' ? services : services.filter(service => service.category === activeTab);

  // Get unique categories for tabs
  const categories = ['all-services', ...new Set(services.map(service => service.category))];

  return (
    <PageLayout>
      <div className='mb-6 flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold text-garage-primary mb-2'>Service Management</h1>
          <p className='text-gray-500'>Add, edit, and manage services offered by your garage</p>
        </div>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            onClick={() => setSelectMode(!selectMode)}
            className={selectMode ? 'bg-garage-primary/10' : ''}
          >
            {selectMode ? 'Exit Select Mode' : 'Select Services for Job Card'}
          </Button>
          <Button
            className='bg-garage-primary hover:bg-garage-primary/90'
            onClick={() => {
              setEditingService(null);
              setIsFormOpen(true);
            }}
          >
            <Plus className='h-4 w-4 mr-2' /> Add New Service
          </Button>
        </div>
      </div>

      <Card className='p-6'>
        <Tabs defaultValue='all-services' value={activeTab} onValueChange={setActiveTab}>
          <TabsList className='mb-6 overflow-x-auto flex w-full'>
            {categories.map(category => (
              <TabsTrigger key={category} value={category} className='capitalize'>
                {category === 'all-services' ? 'All Services' : category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab}>
            <ServiceList
              services={filteredServices}
              onEdit={startEditService}
              onDelete={handleDeleteService}
              selectable={selectMode}
              onSelectServices={handleSelectServices}
            />
          </TabsContent>
        </Tabs>
      </Card>

      {/* Service Form Dialog */}
      <ServiceForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={editingService ? handleEditService : handleAddService}
        initialData={editingService}
      />
    </PageLayout>
  );
};

export default Services;
