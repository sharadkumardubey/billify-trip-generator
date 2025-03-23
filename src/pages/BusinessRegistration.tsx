
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import BusinessForm from "@/components/BusinessForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";

// Define the business data type
interface BusinessFormData {
  businessName: string;
  businessAddress: string;
  gstNumber: string;
  proprietorName: string;
  contactNumber: string;
  email: string;
}

const BusinessRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (data: BusinessFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call to Supabase to store business data
    setTimeout(() => {
      console.log("Business registration data:", data);
      
      // Show success toast
      toast.success("Business registered successfully", {
        description: "You can now generate invoices",
      });
      
      setIsSubmitting(false);
      
      // Redirect to bill generation page
      navigate("/bill-generation");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={true} />
      
      <main className="pt-24 px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Business Registration</h1>
            <p className="text-muted-foreground">
              Register your business details to be used in your invoices
            </p>
          </div>
          
          <Card className="glass animate-fade-in">
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Fill in your business details. These will appear on all invoices you generate.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BusinessForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default BusinessRegistration;
