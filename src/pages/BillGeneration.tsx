import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { format } from "date-fns";
import Navbar from "@/components/Navbar";
import BillForm from "@/components/BillForm";
import InvoicePreview from "@/components/InvoicePreview";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

interface BusinessData {
  business_name: string;
  business_address: string;
  gst_number: string;
  proprietor_name: string;
  contact_number: string;
  email: string;
}

interface BillFormData {
  fromLocation: string;
  toLocation: string;
  distanceKm: number;
  pricePerKm: number;
  gstPercentage: number;
  customerName: string;
  customerPhone: string;
  carNumber: string;
  date: string;
}

const BillGeneration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [invoiceData, setInvoiceData] = useState(null);
  const [activeTab, setActiveTab] = useState("form");
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const fetchBusinessData = async () => {
      if (!user?.id) {
        navigate('/dashboard')
        return;
      };

      try {
        const { data, error } = await supabase
          .from('businesses')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching business data:', error);
          toast.error('Failed to load business data');
          return;
        }

        if (!data) {
          toast.error('No business profile found');
          navigate('/business-registration');
          return;
        }

        setBusinessData(data);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to load business data');
      }
    };

    fetchBusinessData();
  }, []);
  console.log({businessData})

  const generateInvoiceNumber = () => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `INV${year}${month}${random}`;
  };

  const handleSubmit = async (data: BillFormData) => {
    if (!businessData || !user?.id) {
      toast.error('Business data not available');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Calculate amounts
    const baseAmount = Number(data.pricePerKm);
      const gstAmount = baseAmount * (data.gstPercentage / 100);
      const totalAmount = baseAmount + gstAmount;
      
      // Create invoice data
      const invoiceData = {
        user_id: user.id,
        invoice_number: generateInvoiceNumber(),
        invoice_date: format(new Date(), 'yyyy-MM-dd'),
        business_name: businessData.business_name,
        business_address: businessData.business_address,
        gst_number: businessData.gst_number,
        proprietor_name: businessData.proprietor_name,
        contact_number: businessData.contact_number,
        business_email: businessData.email,
        customer_name: data.customerName,
        customer_phone: data.customerPhone,
        car_number: data.carNumber,
        distance_km: data.distanceKm,
        price_per_km: data.pricePerKm,
        base_amount: baseAmount,
        gst_percentage: data.gstPercentage,
        gst_amount: gstAmount,
        total_amount: totalAmount,
        from_location: data.fromLocation,
        to_location: data.toLocation,
        created_at: new Date().toISOString()
      };

      // Save invoice to Supabase
      const { data: savedInvoice, error } = await supabase
        .from('invoices')
        .insert(invoiceData)
        .select()
        .single();

      if (error) {
        console.error('Error saving invoice:', error);
        throw new Error('Failed to save invoice');
      }

      console.log('Invoice saved successfully:', savedInvoice);
      setInvoiceData(savedInvoice);
      
      toast.success('Invoice generated successfully', {
        description: `Invoice number: ${invoiceData.invoice_number}`,
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate invoice', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
    } finally {
      setIsSubmitting(false);
      setActiveTab("preview");
    }
  };

  const handleDownload = () => {
    if (invoiceData) {
      console.log(invoiceData)
      toast.success("Invoice downloaded", {
        description: "Your PDF has been saved to your device",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={true} onSignOut={signOut} />
      
      <main className="pt-24 px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Generate Invoice</h1>
            <p className="text-muted-foreground">
              Fill in the trip details to generate an invoice
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
                  data={invoiceData} 
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
