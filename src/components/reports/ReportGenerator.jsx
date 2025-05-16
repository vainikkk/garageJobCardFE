import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Label } from '../components/ui/label';
import WhatsAppShare from '../components/dialogs/WhatsAppShare';
import { toast } from 'sonner';
import { ArrowRight, FileText, Share2 } from 'lucide-react';

const ReportGenerator = ({ ownerPhoneNumber = '' }) => {
  const [reportType, setReportType] = useState('daily');
  const [reportPeriod, setReportPeriod] = useState('today');
  const [generatedReport, setGeneratedReport] = useState(null);
  const [showWhatsAppShare, setShowWhatsAppShare] = useState(false);

  // Mock data for demonstration
  const mockReportData = {
    pendingJobs: [
      {
        id: 'JC-23045',
        customerName: 'John Smith',
        vehicleReg: 'ABC 123',
        status: 'pending',
        mechanicName: 'Mike Johnson',
      },
      {
        id: 'JC-23046',
        customerName: 'Sarah Williams',
        vehicleReg: 'XYZ 789',
        status: 'in-progress',
        mechanicName: 'David Clark',
      },
    ],
    completedToday: [{ id: 'JC-23044', customerName: 'Emily Davis', vehicleReg: 'DEF 456', totalAmount: 1250 }],
    completedYesterday: [
      { id: 'JC-23043', customerName: 'Robert Taylor', vehicleReg: 'GHI 789', totalAmount: 3500 },
      { id: 'JC-23042', customerName: 'Patricia Moore', vehicleReg: 'JKL 012', totalAmount: 850 },
    ],
    monthlySummary: {
      totalJobs: 45,
      totalRevenue: 78500,
      pendingPayments: 12500,
    },
    pendingPayments: [
      { id: 'JC-23041', customerName: 'Thomas Wilson', amountDue: 3200 },
      { id: 'JC-23040', customerName: 'Jessica Brown', amountDue: 1700 },
    ],
  };

  const generateReport = () => {
    // In a real app, this would fetch data from the database based on the selected type and period

    // For demo purposes, we'll just use the mock data
    setGeneratedReport({
      type: reportType,
      period: reportPeriod,
      data: mockReportData,
      generatedAt: new Date(),
    });

    toast.success('Report generated successfully');
  };

  const handleShareReport = () => {
    if (!ownerPhoneNumber) {
      toast.error("Please enter the owner's phone number in the Scheduled Reports section");
      return;
    }

    if (!generatedReport) {
      toast.error('Please generate a report first');
      return;
    }

    setShowWhatsAppShare(true);
  };

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-3'>
          <Label htmlFor='report-type'>Report Type</Label>
          <Select value={reportType} onValueChange={value => setReportType(value)}>
            <SelectTrigger id='report-type'>
              <SelectValue placeholder='Select report type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='daily'>Daily Report</SelectItem>
              <SelectItem value='weekly'>Weekly Report</SelectItem>
              <SelectItem value='monthly'>Monthly Report</SelectItem>
              <SelectItem value='custom'>Custom Report</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-3'>
          <Label htmlFor='report-period'>Report Period</Label>
          <Select value={reportPeriod} onValueChange={value => setReportPeriod(value)}>
            <SelectTrigger id='report-period'>
              <SelectValue placeholder='Select period' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='today'>Today</SelectItem>
              <SelectItem value='yesterday'>Yesterday</SelectItem>
              <SelectItem value='last7days'>Last 7 Days</SelectItem>
              <SelectItem value='last30days'>Last 30 Days</SelectItem>
              <SelectItem value='thisMonth'>This Month</SelectItem>
              <SelectItem value='lastMonth'>Last Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={generateReport} className='w-full sm:w-auto'>
        <FileText className='mr-2 h-4 w-4' /> Generate Report
      </Button>

      {generatedReport && (
        <Card className='mt-6 border-t-4 border-garage-accent'>
          <CardContent className='pt-6'>
            <div className='space-y-4'>
              <div className='flex justify-between items-center'>
                <h3 className='text-lg font-semibold'>
                  {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report -{' '}
                  {reportPeriod.charAt(0).toUpperCase() + reportPeriod.slice(1)}
                </h3>
                <Button variant='outline' onClick={handleShareReport}>
                  <Share2 className='mr-2 h-4 w-4' /> Share via WhatsApp
                </Button>
              </div>

              <div className='space-y-4 mt-4'>
                <div>
                  <h4 className='text-sm font-medium text-gray-500 mb-2'>
                    Pending Jobs ({generatedReport.data.pendingJobs.length})
                  </h4>
                  <div className='bg-gray-50 p-3 rounded-md space-y-2 text-sm'>
                    {generatedReport.data.pendingJobs.map(job => (
                      <div key={job.id} className='flex items-center justify-between'>
                        <div>
                          <span className='font-medium'>{job.id}</span> - {job.customerName} ({job.vehicleReg})
                        </div>
                        <div className='text-garage-primary'>{job.mechanicName}</div>
                      </div>
                    ))}
                    {generatedReport.data.pendingJobs.length === 0 && <p>No pending jobs</p>}
                  </div>
                </div>

                <div>
                  <h4 className='text-sm font-medium text-gray-500 mb-2'>
                    Completed Today ({generatedReport.data.completedToday.length})
                  </h4>
                  <div className='bg-gray-50 p-3 rounded-md space-y-2 text-sm'>
                    {generatedReport.data.completedToday.map(job => (
                      <div key={job.id} className='flex items-center justify-between'>
                        <div>
                          <span className='font-medium'>{job.id}</span> - {job.customerName} ({job.vehicleReg})
                        </div>
                        <div className='font-medium'>₹{job.totalAmount}</div>
                      </div>
                    ))}
                    {generatedReport.data.completedToday.length === 0 && <p>No jobs completed today</p>}
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                  <div className='bg-garage-primary/10 p-3 rounded-md'>
                    <p className='text-sm text-garage-primary'>Total Jobs</p>
                    <p className='text-xl font-bold'>{generatedReport.data.monthlySummary.totalJobs}</p>
                  </div>
                  <div className='bg-garage-accent/10 p-3 rounded-md'>
                    <p className='text-sm text-garage-accent'>Total Revenue</p>
                    <p className='text-xl font-bold'>₹{generatedReport.data.monthlySummary.totalRevenue}</p>
                  </div>
                  <div className='bg-yellow-100 p-3 rounded-md'>
                    <p className='text-sm text-yellow-800'>Pending Payments</p>
                    <p className='text-xl font-bold'>₹{generatedReport.data.monthlySummary.pendingPayments}</p>
                  </div>
                </div>
              </div>

              <p className='text-xs text-gray-500 text-right'>
                Generated on: {generatedReport.generatedAt.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <WhatsAppShare
        open={showWhatsAppShare}
        onOpenChange={setShowWhatsAppShare}
        phoneNumber={ownerPhoneNumber}
        mode='dailyReport'
        reportData={generatedReport?.data}
      />
    </div>
  );
};

export default ReportGenerator;
