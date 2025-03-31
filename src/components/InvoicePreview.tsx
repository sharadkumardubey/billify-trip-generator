import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import InvoicePDFGenerator from "./InvoicePDFGenerator";

interface InvoicePreviewProps {
  data: {
    invoice_number: string;
    invoice_date: string;
    business_name: string;
    business_address: string;
    gst_number: string;
    proprietor_name: string;
    contact_number: string;
    business_email: string;
    customer_name: string;
    customer_phone: string;
    from_location: string;
    to_location: string;
    distance_km: number;
    price_per_km: number;
    base_amount: number;
    gst_percentage: number;
    gst_amount: number;
    total_amount: number;
  };
  onDownload: () => void;
}

const InvoicePreview = ({ data, onDownload }: InvoicePreviewProps) => {
  return (
    <div className="animate-scale-in space-y-6">
      <Card className="p-8 max-w-3xl mx-auto print:shadow-none print:border-none">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{data.business_name}</CardTitle>
              <CardDescription className="mt-2 whitespace-pre-line">
                {data.business_address}
                <br />
                GST: {data.gst_number}
                <br />
                Contact: {data.contact_number}
                <br />
                Email: {data.business_email}
              </CardDescription>
            </div>
            <div className="text-right">
              <p className="font-medium">Invoice #{data.invoice_number}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Date: {data.invoice_date}
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Customer Details */}
          <div>
            <h3 className="font-medium mb-2">Customer Details</h3>
            <div className="text-sm space-y-1">
              <p><strong>Name:</strong> {data.customer_name}</p>
              <p><strong>Phone:</strong> {data.customer_phone}</p>
            </div>
          </div>
          
          {/* Trip Details */}
          <div>
            <h3 className="font-medium mb-2">Trip Details</h3>
            <div className="text-sm space-y-1">
              <p><strong>From:</strong> {data.from_location}</p>
              <p><strong>To:</strong> {data.to_location}</p>
              <p><strong>Distance:</strong> {data.distance_km} km</p>
              <p><strong>Rate:</strong> ₹{data.price_per_km}/km</p>
              <p><strong>Car Number:</strong> {data.car_number}</p>
            </div>
          </div>
          
          {/* Amount Details */}
          <div className="pt-4 border-t">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Base Amount:</span>
                <span>₹{data.base_amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">GST ({data.gst_percentage}%):</span>
                <span>₹{data.gst_amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-medium pt-2 border-t">
                <span>Total Amount:</span>
                <span>₹{data.total_amount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6 flex justify-center print:hidden">
      <Button onClick={onDownload} className="gap-2">
      <Download className="h-4 w-4" />
      <PDFDownloadLink document={<InvoicePDFGenerator data={data} />} fileName={`Invoice_${data.invoice_number}.pdf`}>
        {({ loading }) => <button>{loading ? "Generating PDF..." : "Download PDF"}</button>}
      </PDFDownloadLink>
        </Button>
      </div>
    </div>
  );
};

export default InvoicePreview;
