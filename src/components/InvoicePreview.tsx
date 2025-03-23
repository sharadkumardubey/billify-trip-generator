
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";

interface InvoicePreviewProps {
  invoiceData: {
    businessName: string;
    businessAddress: string;
    gstNumber: string;
    proprietorName: string;
    contactNumber: string;
    email: string;
    fromLocation: string;
    toLocation: string;
    distanceKm: number;
    pricePerKm: number;
    gstPercentage: number;
    customerName: string;
    customerPhone: string;
    date: string;
    invoiceNumber: string;
    baseAmount: number;
    gstAmount: number;
    totalAmount: number;
  };
  onDownload: () => void;
}

const InvoicePreview = ({ invoiceData, onDownload }: InvoicePreviewProps) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="animate-scale-in">
      <Card className="p-8 max-w-3xl mx-auto print:shadow-none print:border-none">
        <div className="flex flex-col space-y-6">
          {/* Invoice Header */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{invoiceData.businessName}</h1>
              <p className="text-muted-foreground whitespace-pre-line">
                {invoiceData.businessAddress}
              </p>
              <p className="mt-2">
                <span className="font-medium">GST No: </span>
                {invoiceData.gstNumber}
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-md inline-block">
                TAX INVOICE
              </div>
              <p className="mt-2">
                <span className="font-medium">Invoice No: </span>
                {invoiceData.invoiceNumber}
              </p>
              <p>
                <span className="font-medium">Date: </span>
                {formatDate(invoiceData.date)}
              </p>
            </div>
          </div>
          
          {/* Customer Details */}
          <div className="border-t border-b py-4">
            <h2 className="font-semibold mb-2">Customer Details:</h2>
            <div className="grid md:grid-cols-2 gap-2">
              <p>
                <span className="text-muted-foreground">Name: </span>
                {invoiceData.customerName}
              </p>
              <p>
                <span className="text-muted-foreground">Phone: </span>
                {invoiceData.customerPhone}
              </p>
            </div>
          </div>
          
          {/* Travel Details */}
          <div>
            <h2 className="font-semibold mb-3">Travel Details:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-secondary/50 p-3 rounded-md">
                <span className="text-muted-foreground">From: </span>
                <span className="font-medium">{invoiceData.fromLocation}</span>
              </div>
              <div className="bg-secondary/50 p-3 rounded-md">
                <span className="text-muted-foreground">To: </span>
                <span className="font-medium">{invoiceData.toLocation}</span>
              </div>
              <div className="bg-secondary/50 p-3 rounded-md">
                <span className="text-muted-foreground">Distance: </span>
                <span className="font-medium">{invoiceData.distanceKm} KM</span>
              </div>
              <div className="bg-secondary/50 p-3 rounded-md">
                <span className="text-muted-foreground">Rate: </span>
                <span className="font-medium">₹ {invoiceData.pricePerKm.toFixed(2)}/KM</span>
              </div>
            </div>
          </div>
          
          {/* Calculation */}
          <div className="border-t pt-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Base Fare ({invoiceData.distanceKm} KM × ₹{invoiceData.pricePerKm}/KM)</span>
                <span className="font-medium">₹ {invoiceData.baseAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST @ {invoiceData.gstPercentage}%</span>
                <span className="font-medium">₹ {invoiceData.gstAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t text-lg font-bold">
                <span>Total Amount</span>
                <span>₹ {invoiceData.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="border-t pt-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Terms & Conditions:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Payment is due upon receipt of invoice.</li>
              <li>This is a computer-generated invoice and does not require a signature.</li>
              <li>Please quote invoice number for all correspondences.</li>
            </ol>
            
            <div className="mt-6 text-center">
              <p className="font-medium text-foreground">Thank you for your business!</p>
              <p>For any queries, please contact: {invoiceData.contactNumber}</p>
              <p>{invoiceData.email}</p>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="mt-6 flex justify-center print:hidden">
        <Button onClick={onDownload} className="gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default InvoicePreview;
