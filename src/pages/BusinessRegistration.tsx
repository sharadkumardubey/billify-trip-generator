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
  console.log(userHasBusinessProfile)

  // Redirect if not logged in
  if (!user) {
    console.log("No user found, redirecting to dashboard");
    return <Navigate to="/dashboard" />;
  }

  // Redirect if already has business profile
  if (userHasBusinessProfile) {
    console.log("User already has a business profile, redirecting to bill generation");
    return <Navigate to="/bill-generation" />;
  }

  const handleSubmit = async (data: BusinessFormData) => {
    console.log("Business form submission started", data);
    setIsSubmitting(true);
    
    // Create an abort controller for timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      if (!user?.id) {
        console.error("User ID is undefined or null");
        throw new Error("User is not properly authenticated");
      }

      // Double check if user already has a business profile
      const { data: existingBusiness, error: checkError } = await supabase
        .from('businesses')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existingBusiness) {
        throw new Error("A business profile already exists for this user");
      }

      console.log("Inserting business data for user:", user.id);
      
      // Insert business data into Supabase with better error handling
      console.log("About to call Supabase insert...");
      const insertResult = await Promise.race([
        supabase
          .from('businesses')
          .insert({
            user_id: user.id,
            business_name: data.businessName,
            business_address: data.businessAddress,
            gst_number: data.gstNumber,
            proprietor_name: data.proprietorName,
            contact_number: data.contactNumber,
            email: data.email
          })
          .select(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Operation timed out")), 10000)
        )
      ]) as { data: any[] | null; error: any };
      
      console.log("Supabase insert completed", insertResult);
      
      if (insertResult.error) {
        console.error("Supabase insert error:", insertResult.error);
        throw insertResult.error;
      }
      
      console.log("Business registered successfully:", insertResult.data);
      
      toast.success("Business registered successfully", {
        description: "You can now generate invoices",
      });
      
      navigate("/bill-generation");
    } catch (error) {
      console.error("Error saving business data:", error);
      
      // More specific error messages based on type
      let errorMessage = "Please try again later";
      if (error instanceof Error) {
        if (error.message === "Operation timed out") {
          errorMessage = "The operation timed out. Please try again.";
        } else {
          errorMessage = error.message;
        }
      } else if (typeof error === 'object' && error !== null) {
        const err = error as any;
        if (err.code === '23505') {
          errorMessage = "A business profile already exists for this user";
        } else if (err.code === '42P01') {
          errorMessage = "Database table doesn't exist. Please contact support";
        } else if (err.code === '42501') {
          errorMessage = "Permission denied. Your account may not have access";
        } else if (err.message) {
          errorMessage = err.message;
        }
      }
      
      toast.error("Failed to register business", {
        description: errorMessage,
      });
    } finally {
      clearTimeout(timeout);
      console.log("Form submission process completed");
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
