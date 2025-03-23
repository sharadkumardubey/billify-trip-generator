
import { useState } from "react";
import Navbar from "@/components/Navbar";
import BillForm from "@/components/BillForm";
import InvoicePreview from "@/components/InvoicePreview";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { generatePDF } from "@/utils/pdfGenerator";

// Mock business data (in a real app, this would come from Supabase)
const businessData = {
  businessName: "Sunshine Tours & Travels",
  businessAddress: "123 Travel Lane, Tourism City, TC 56789",
  gstNumber: "22AAAAA0000A1Z5",
  proprietorName: "Jane Smith",
  contactNumber: "9876543210",
  email: "contact@sunshinetravels.com",
};

interface BillFormData {
  fromLocation: string;
  toLocation: string;
  distanceKm: number;
  pricePerKm: number;
  gstPercentage: number;
  customerName: string;
  customerPhone: string;
  date: string;
}

const BillGeneration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("form");
  const [invoiceData, setInvoiceData] = useState<any>(null);

  // Generate a random invoice number
  const generateInvoiceNumber = () => {
    const prefix = "INV";
    const timestamp = new Date().getTime().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    return `${prefix}-${timestamp}-${random}`;
  };

  // Handle form submission
  const handleSubmit = (data: BillFormData, totalAmount: number) => {
    setIsSubmitting(true);
    
    // Calculate amounts
    const baseAmount = data.distanceKm * data.pricePerKm;
    const gstAmount = baseAmount * (data.gstPercentage / 100);
    
    // Create invoice data by combining business data and form data
    const invoiceData = {
      ...businessData,
      ...data,
      invoiceNumber: generateInvoiceNumber(),
      baseAmount,
      gstAmount,
      totalAmount,
    };
    
    // Simulate API call to save invoice
    setTimeout(() => {
      console.log("Invoice data:", invoiceData);
      setInvoiceData(invoiceData);
      
      // Show success toast
      toast.success("Invoice generated successfully", {
        description: "You can now download your invoice",
      });
      
      setIsSubmitting(false);
      setActiveTab("preview");
    }, 1500);
  };

  // Handle PDF download
  const handleDownload = () => {
    if (invoiceData) {
      generatePDF(invoiceData);
      
      toast.success("Invoice downloaded", {
        description: "Your PDF has been saved to your device",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={true} />
      
      <main className="pt-24 px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Generate Invoice</h1>
            <p className="text-muted-foreground">
              Enter trip details and create a professional invoice for your travel services
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
            <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
              <TabsTrigger value="form">Trip Details</TabsTrigger>
              <TabsTrigger value="preview" disabled={!invoiceData}>
                Preview Invoice
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="form" className="mt-0">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Trip Details</CardTitle>
                  <CardDescription>
                    Fill in the details of the trip to generate an invoice
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BillForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preview" className="mt-0">
              {invoiceData && (
                <InvoicePreview 
                  invoiceData={invoiceData} 
                  onDownload={handleDownload} 
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default BillGeneration;
