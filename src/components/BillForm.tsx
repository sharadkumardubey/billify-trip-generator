
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
import { Card } from "@/components/ui/card";

// Bill generation schema
const billSchema = z.object({
  fromLocation: z.string().min(2, "Starting location is required"),
  toLocation: z.string().min(2, "Destination is required"),
  distanceKm: z.coerce.number().positive("Distance must be a positive number"),
  pricePerKm: z.coerce.number().positive("Price must be a positive number"),
  gstPercentage: z.coerce.number().min(0, "GST cannot be negative").max(28, "GST cannot exceed 28%"),
  customerName: z.string().min(2, "Customer name is required"),
  customerPhone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  date: z.string(),
});

type BillFormData = z.infer<typeof billSchema>;

interface BillFormProps {
  onSubmit: (data: BillFormData, totalAmount: number) => void;
  isSubmitting?: boolean;
}

const BillForm = ({ onSubmit, isSubmitting = false }: BillFormProps) => {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [baseAmount, setBaseAmount] = useState<number>(0);
  const [gstAmount, setGstAmount] = useState<number>(0);

  // Get current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().slice(0, 10);

  const form = useForm<BillFormData>({
    resolver: zodResolver(billSchema),
    defaultValues: {
      fromLocation: "",
      toLocation: "",
      distanceKm: 0,
      pricePerKm: 0,
      gstPercentage: 5,
      customerName: "",
      customerPhone: "",
      date: currentDate,
    },
  });

  // Calculate total on form values change
  const calculateTotal = () => {
    const distance = form.getValues("distanceKm");
    const pricePerKm = form.getValues("pricePerKm");
    const gstPercentage = form.getValues("gstPercentage");
    
    if (distance && pricePerKm) {
      const base = Number(pricePerKm);
      const gst = base * (gstPercentage / 100);
      const total = base + gst;
      
      setBaseAmount(base);
      setGstAmount(gst);
      setTotalAmount(total);
    }
  };

  // Handle form submission
  const handleSubmit = (data: BillFormData) => {
    onSubmit(data, totalAmount);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 animate-fade-in">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fromLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Delhi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="toLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Agra" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="distanceKm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Distance (KM)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="230" 
                        {...field} 
                        onChange={(e) => {
                          field.onChange(e);
                          setTimeout(calculateTotal, 100);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="pricePerKm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (₹)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="15" 
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setTimeout(calculateTotal, 100);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="gstPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GST Percentage (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="5" 
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setTimeout(calculateTotal, 100);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Common GST rates: 5%, 12%, 18%, 28%
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="customerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="9999999999" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="space-y-6">
            <Card className="p-6 bg-secondary/50 border-secondary animate-fade-in">
              <h3 className="text-lg font-semibold mb-4">Invoice Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base Amount:</span>
                  <span className="font-medium">₹ {baseAmount?.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    GST ({form.getValues("gstPercentage")}%):
                  </span>
                  <span className="font-medium">₹ {gstAmount.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-4 flex justify-between">
                  <span className="font-semibold">Total Amount:</span>
                  <span className="font-bold text-lg">₹ {totalAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong>Distance:</strong> {form.getValues("distanceKm")} KM
                </p>
                <p>
                  <strong>Rate:</strong> ₹ {form.getValues("pricePerKm")}
                </p>
              </div>
              
              <Button 
                type="button" 
                className="w-full mt-6"
                onClick={calculateTotal}
                variant="outline"
              >
                Recalculate
              </Button>
            </Card>
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-t-2 border-r-2 border-primary-foreground rounded-full animate-spin" />
                  <span>Generating...</span>
                </div>
              ) : (
                "Generate Invoice"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default BillForm;
