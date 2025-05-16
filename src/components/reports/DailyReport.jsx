import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { jobCards } from '../../lib/mockData';
import { Calendar, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import WhatsAppShare from '../dialogs/WhatsAppShare';
import { formatCurrency } from '../../lib/utils';
import { toast } from '../components/ui/use-toast';

const DailyReport = () => {
  const [reportTime, setReportTime] = useState('18:00');
  const [reportPeriod, setReportPeriod] = useState('today');
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [ownerPhoneNumber, setOwnerPhoneNumber] = useState('');

  // Filter job cards based on the selected period
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const lastWeekStart = new Date(today);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);

  const lastMonthStart = new Date(today);
  lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);

  // Generate report data
  const pendingJobs = jobCards.filter(job => job.status === 'pending' || job.status === 'in-progress');

  const completedToday = jobCards.filter(
    job => job.status === 'completed' && new Date(job.updatedAt).getTime() >= today.getTime()
  );

  const completedYesterday = jobCards.filter(
    job =>
      job.status === 'completed' &&
      new Date(job.updatedAt).getTime() >= yesterday.getTime() &&
      new Date(job.updatedAt).getTime() < today.getTime()
  );

  const paymentPendingJobs = jobCards.filter(
    job => job.paymentStatus === 'unpaid' || job.paymentStatus === 'partially-paid'
  );

  // Monthly summary
  const allJobsThisMonth = jobCards.filter(
    job =>
      new Date(job.dateOfService).getMonth() === today.getMonth() &&
      new Date(job.dateOfService).getFullYear() === today.getFullYear()
  );

  const totalRevenue = allJobsThisMonth.reduce(
    (sum, job) => (job.paymentStatus === 'paid' ? sum + job.totalAmount : sum),
    0
  );

  const pendingPayments = allJobsThisMonth.reduce(
    (sum, job) => (job.paymentStatus !== 'paid' ? sum + job.totalAmount : sum),
    0
  );

  const generateReportText = () => {
    const currentDate = format(new Date(), 'MMMM d, yyyy');

    let reportText = `GARAGE SERVICE PRO - DAILY REPORT\n`;
    reportText += `Date: ${currentDate}\n\n`;

    reportText += `PENDING JOBS (${pendingJobs.length}):\n`;
    pendingJobs.forEach(job => {
      reportText += `- #${job.id} | ${job.customerName} | ${job.vehicleReg} | ${job.status}\n`;
    });

    reportText += `\nCOMPLETED TODAY (${completedToday.length}):\n`;
    completedToday.forEach(job => {
      reportText += `- #${job.id} | ${job.customerName} | ${job.vehicleReg} | ${formatCurrency(job.totalAmount)}\n`;
    });

    reportText += `\nCOMPLETED YESTERDAY (${completedYesterday.length}):\n`;
    completedYesterday.forEach(job => {
      reportText += `- #${job.id} | ${job.customerName} | ${job.vehicleReg} | ${formatCurrency(job.totalAmount)}\n`;
    });

    reportText += `\nMONTHLY SUMMARY:\n`;
    reportText += `- Total Jobs: ${allJobsThisMonth.length}\n`;
    reportText += `- Total Revenue: ${formatCurrency(totalRevenue)}\n`;
    reportText += `- Pending Payments: ${formatCurrency(pendingPayments)}\n`;

    reportText += `\nPAYMENT PENDING JOBS (${paymentPendingJobs.length}):\n`;
    paymentPendingJobs.forEach(job => {
      reportText += `- #${job.id} | ${job.customerName} | ${formatCurrency(job.totalAmount)}\n`;
    });

    return reportText;
  };

  const handleScheduleReport = () => {
    // In a real app, this would set up the scheduled report in the backend
    toast({
      title: 'Report Scheduled',
      description: `Daily report scheduled for ${reportTime} every day`,
    });
  };

  const handleGenerateReport = () => {
    if (!ownerPhoneNumber) {
      toast({
        title: 'Error',
        description: "Please enter the owner's phone number",
        variant: 'destructive',
      });
      return;
    }
    setShowShareDialog(true);
  };

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Schedule Daily Report</CardTitle>
          <CardDescription>Set up automatic daily reports via WhatsApp</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='report-time'>Report Time</Label>
              <Input id='report-time' type='time' value={reportTime} onChange={e => setReportTime(e.target.value)} />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='owner-phone'>Owner's WhatsApp Number</Label>
              <Input
                id='owner-phone'
                type='tel'
                placeholder='e.g. +1234567890'
                value={ownerPhoneNumber}
                onChange={e => setOwnerPhoneNumber(e.target.value)}
              />
              <p className='text-xs text-muted-foreground'>Include country code</p>
            </div>
          </div>
          <Button className='mt-4 w-full' onClick={handleScheduleReport}>
            Schedule Daily Report
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generate Custom Report</CardTitle>
          <CardDescription>Create and share reports for specific time periods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            <div className='space-y-2'>
              <Label htmlFor='report-period'>Report Period</Label>
              <Select value={reportPeriod} onValueChange={setReportPeriod}>
                <SelectTrigger id='report-period'>
                  <SelectValue placeholder='Select period' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='today'>Today</SelectItem>
                  <SelectItem value='yesterday'>Yesterday</SelectItem>
                  <SelectItem value='last7days'>Last 7 Days</SelectItem>
                  <SelectItem value='last30days'>Last 30 Days</SelectItem>
                  <SelectItem value='thisMonth'>This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className='w-full' onClick={handleGenerateReport}>
            <Share2 className='mr-2 h-4 w-4' />
            Generate & Share Report
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Report Preview</CardTitle>
          <CardDescription>Preview of current report data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div>
              <h3 className='text-sm font-medium mb-2 flex items-center'>
                <Calendar className='mr-2 h-4 w-4' />
                {format(new Date(), 'MMMM d, yyyy')}
              </h3>
            </div>

            <div>
              <h3 className='font-medium'>Pending Jobs ({pendingJobs.length})</h3>
              <div className='mt-2 text-sm'>
                {pendingJobs.length > 0 ? (
                  <div className='space-y-1'>
                    {pendingJobs.slice(0, 3).map(job => (
                      <div key={job.id} className='flex justify-between'>
                        <span>
                          #{job.id} - {job.customerName}
                        </span>
                        <span className='text-muted-foreground'>{job.vehicleReg}</span>
                      </div>
                    ))}
                    {pendingJobs.length > 3 && (
                      <div className='text-muted-foreground text-xs'>+ {pendingJobs.length - 3} more jobs</div>
                    )}
                  </div>
                ) : (
                  <p className='text-muted-foreground'>No pending jobs</p>
                )}
              </div>
            </div>

            <div>
              <h3 className='font-medium'>Completed Today ({completedToday.length})</h3>
              <div className='mt-2 text-sm'>
                {completedToday.length > 0 ? (
                  <div className='space-y-1'>
                    {completedToday.slice(0, 3).map(job => (
                      <div key={job.id} className='flex justify-between'>
                        <span>
                          #{job.id} - {job.customerName}
                        </span>
                        <span>{formatCurrency(job.totalAmount)}</span>
                      </div>
                    ))}
                    {completedToday.length > 3 && (
                      <div className='text-muted-foreground text-xs'>+ {completedToday.length - 3} more jobs</div>
                    )}
                  </div>
                ) : (
                  <p className='text-muted-foreground'>No completed jobs today</p>
                )}
              </div>
            </div>

            <div>
              <h3 className='font-medium'>Monthly Summary</h3>
              <div className='mt-2 grid grid-cols-3 gap-2 text-sm'>
                <div className='bg-gray-50 p-2 rounded'>
                  <div className='text-muted-foreground'>Total Jobs</div>
                  <div className='font-medium'>{allJobsThisMonth.length}</div>
                </div>
                <div className='bg-gray-50 p-2 rounded'>
                  <div className='text-muted-foreground'>Revenue</div>
                  <div className='font-medium'>{formatCurrency(totalRevenue)}</div>
                </div>
                <div className='bg-gray-50 p-2 rounded'>
                  <div className='text-muted-foreground'>Pending</div>
                  <div className='font-medium'>{formatCurrency(pendingPayments)}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <WhatsAppShare
        open={showShareDialog}
        onOpenChange={setShowShareDialog}
        phoneNumber={ownerPhoneNumber}
        mode='dailyReport'
      />
    </div>
  );
};

export default DailyReport;
