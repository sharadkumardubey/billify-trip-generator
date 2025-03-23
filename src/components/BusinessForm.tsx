import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Business registration schema
const businessSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  businessAddress: z.string().min(5, "Address must be at least 5 characters"),
  gstNumber: z.string()
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GST number format"),
  proprietorName: z.string().min(2, "Proprietor name must be at least 2 characters"),
  contactNumber: z.string()
    .regex(/^[0-9]{10}$/, "Contact number must be 10 digits"),
  email: z.string().email("Invalid email address"),
});

type BusinessFormData = z.infer<typeof businessSchema>;

interface BusinessFormProps {
  onSubmit: (data: BusinessFormData) => void;
  isSubmitting?: boolean;
}

const BusinessForm = ({ onSubmit, isSubmitting = false }: BusinessFormProps) => {
  const form = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      businessName: "",
      businessAddress: "",
      gstNumber: "",
      proprietorName: "",
      contactNumber: "",
      email: "",
    },
  });

  // Handle form submission
  const handleSubmit = (data: BusinessFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 animate-fade-in">
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="XYZ Tours & Travels" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="proprietorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proprietor's Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="businessAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Business Street, City, State, PIN" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="gstNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GST Number</FormLabel>
              <FormControl>
                <Input placeholder="22AAAAA0000A1Z5" {...field} />
              </FormControl>
              <FormDescription>
                Indian GST number format: 22AAAAA0000A1Z5
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="9999999999" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="business@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 border-t-2 border-r-2 border-primary-foreground rounded-full animate-spin" />
              <span>Registering...</span>
            </div>
          ) : (
            "Register Business"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default BusinessForm;
