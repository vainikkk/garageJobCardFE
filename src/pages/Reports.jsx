
import { useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import DailyReport from "../components/reports/DailyReport";
import { FileText } from "lucide-react";
import { toast } from "sonner";
import ReportScheduler from "../components/reports/ReportScheduler";
import ReportGenerator from "../components/reports/ReportGenerator";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Separator } from "../components/ui/separator";

const Reports = () => {
  const [ownerPhoneNumber, setOwnerPhoneNumber] = useState("");
  const [scheduledReportEnabled, setScheduledReportEnabled] = useState(false);
  const [scheduledReportTime, setScheduledReportTime] = useState("18:00");

  const handleScheduleReport = (time, phoneNumber, enabled) => {
    setScheduledReportTime(time);
    setOwnerPhoneNumber(phoneNumber);
    setScheduledReportEnabled(enabled);
    
    // In a real app, this would save the settings to the database
    console.log("Scheduled report:", { time, phoneNumber, enabled });
  };

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-garage-primary" />
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          </div>
          <p className="text-gray-500 mt-1">Generate and manage garage reports</p>
        </div>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="daily">Daily Reports</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="space-y-4">
          <DailyReport />
        </TabsContent>
        
        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Generator</CardTitle>
            </CardHeader>
            <CardContent>
              <ReportGenerator ownerPhoneNumber={ownerPhoneNumber} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <ReportScheduler 
                onSchedule={handleScheduleReport}
                defaultTime={scheduledReportTime}
                defaultPhoneNumber={ownerPhoneNumber}
                defaultEnabled={scheduledReportEnabled}
              />
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">About Scheduled Reports</h3>
                <p className="text-muted-foreground">
                  Schedule daily summary reports to be sent automatically via WhatsApp to the garage owner.
                  Reports include pending jobs, completed jobs, revenue summary, and pending payments.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm text-yellow-800">
                  <strong>Note:</strong> For scheduled reports to work, the application must be running and connected to the internet.
                  The owner's phone number must have WhatsApp installed.
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">Analytics dashboard is coming soon</p>
                <p className="text-sm text-muted-foreground">Track revenue trends, service popularity, and customer growth</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Reports;
