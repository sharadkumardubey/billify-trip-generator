
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import BusinessForm from "@/components/BusinessForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

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
  const { user, userHasBusinessProfile, signOut } = useAuth();

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/dashboard" />;
  }

  // Redirect if already has business profile
  if (userHasBusinessProfile) {
    return <Navigate to="/bill-generation" />;
  }

  const handleSubmit = async (data: BusinessFormData) => {
    setIsSubmitting(true);
    
    try {
      // Insert business data into Supabase
      const { error } = await supabase
        .from('businesses')
        .insert({
          user_id: user.id,
          business_name: data.businessName,
          business_address: data.businessAddress,
          gst_number: data.gstNumber,
          proprietor_name: data.proprietorName,
          contact_number: data.contactNumber,
          email: data.email
        });
      
      if (error) throw error;
      
      toast.success("Business registered successfully", {
        description: "You can now generate invoices",
      });
      
      navigate("/bill-generation");
    } catch (error) {
      console.error("Error saving business data:", error);
      toast.error("Failed to register business", {
        description: "Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={true} onSignOut={signOut} />
      
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
