import { useState } from 'react';
import { Button } from '../ui/button';
import { Share2, FileText, Download, Printer, MessageCircle, Copy, BarChart4 } from 'lucide-react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import WhatsAppShareDialog from '../dialogs/WhatsAppShareDialog';

export default function ActionsMenu({ jobCardData, variant = 'default', showIcon = true }) {
  const [showShareDialog, setShowShareDialog] = useState(false);

  const handleGenerateBill = () => {
    // In a real app, this would generate a proper PDF
    const billText = `
      GARAGE SERVICE PRO
      INVOICE
      -------------------
      Job Card: #${jobCardData.jobCardId}
      Customer: ${jobCardData.customerName}
      Vehicle: ${jobCardData.vehicleInfo}
      
      Services:
      ${jobCardData.services.map(s => `- ${s.name}: $${s.price}`).join('\n')}
      
      Total Amount: $${jobCardData.totalAmount.toFixed(2)}
    `;

    // Create a blob from the text
    const blob = new Blob([billText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Create temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice-${jobCardData.jobCardId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Bill generated successfully');
  };

  const handleGenerateJobCard = () => {
    // In a real app, this would generate a proper PDF
    const jobCardText = `
      GARAGE SERVICE PRO
      JOB CARD
      -------------------
      Job Card: #${jobCardData.jobCardId}
      Customer: ${jobCardData.customerName}
      Vehicle: ${jobCardData.vehicleInfo}
      
      Services:
      ${jobCardData.services.map(s => `- ${s.name}: $${s.price}`).join('\n')}
      
      Total Amount: $${jobCardData.totalAmount.toFixed(2)}
    `;

    // Create a blob from the text
    const blob = new Blob([jobCardText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Create temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `jobcard-${jobCardData.jobCardId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Job card downloaded');
  };

  const handleCopyToClipboard = () => {
    const text = `Job Card #${jobCardData.jobCardId} for ${jobCardData.customerName}'s ${
      jobCardData.vehicleInfo
    }. Total: $${jobCardData.totalAmount.toFixed(2)}`;
    navigator.clipboard.writeText(text);
    toast.success('Job card details copied to clipboard');
  };

  const handlePrintJobCard = () => {
    toast.info('Preparing document for printing...');
    setTimeout(() => {
      toast.success('Document sent to printer');
    }, 1500);
  };

  const handleSendSMS = () => {
    toast.info('SMS functionality will be available soon');
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} className='bg-gradient-primary hover:opacity-90'>
            {showIcon && <Share2 className='mr-2 h-4 w-4' />}
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='w-56 bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700'
        >
          <DropdownMenuLabel>Job Card Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleGenerateJobCard}
            className='hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer'
          >
            <FileText className='mr-2 h-4 w-4 text-garage-primary' />
            <span>Download Job Card</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleGenerateBill}
            className='hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer'
          >
            <BarChart4 className='mr-2 h-4 w-4 text-garage-accent' />
            <span>Generate Bill</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setShowShareDialog(true)}
            className='hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer'
          >
            <Share2 className='mr-2 h-4 w-4 text-garage-purple' />
            <span>Share via WhatsApp</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handlePrintJobCard}
            className='hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer'
          >
            <Printer className='mr-2 h-4 w-4 text-garage-dark' />
            <span>Print Job Card</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleSendSMS} className='hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer'>
            <MessageCircle className='mr-2 h-4 w-4 text-garage-teal' />
            <span>Send SMS</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleCopyToClipboard}
            className='hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer'
          >
            <Copy className='mr-2 h-4 w-4 text-garage-neutral' />
            <span>Copy to Clipboard</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <WhatsAppShareDialog open={showShareDialog} onOpenChange={setShowShareDialog} jobCardData={jobCardData} />
    </>
  );
}
