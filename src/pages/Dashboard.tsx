import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AuthButton from "@/components/AuthButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, FileText, Receipt } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDFGenerator from "@/components/InvoicePDFGenerator";

interface Invoice {
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
  distance_km: number;
  price_per_km: number;
  base_amount: number;
  gst_percentage: number;
  gst_amount: number;
  total_amount: number;
  from_location: string;
  to_location: string;
  car_number: string;
}

const Dashboard = () => {
  const { user, userHasBusinessProfile, loading, signOut } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  // Redirect if not logged in
  // if (!user) {
  //   console.log("No user found, redirecting to dashboard");
  //   return <Navigate to="/" />;
  // }

  const fetchInvoices = async () => {
    try {
      const { data, error } = await supabase
        .from("invoices")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching invoices:", error);
        toast.error("Failed to load invoices");
        return;
      }

      setInvoices(data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      toast.error("Failed to load invoices");
    }
  };

  useEffect(() => {
    if (!user || !userHasBusinessProfile) return;
    fetchInvoices();
  }, []);

  console.log({ invoices });

  // If authenticated and has business profile, show dashboard
  if (user && userHasBusinessProfile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar isAuthenticated={true} onSignOut={signOut} />

        <main className="pt-24 px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
              <div>
                <h1 className="text-3xl font-bold mb-1 animate-fade-in">
                  Welcome back!
                </h1>
                <p className="text-muted-foreground animate-fade-in">
                  Manage your invoices and generate new bills for your travel
                  business.
                </p>
              </div>
              <Button className="group w-full md:w-auto animate-fade-in">
                <Link to="/bill-generation" className="flex items-center gap-2">
                  <Receipt className="h-4 w-4" />
                  New Invoice
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Total Invoices</CardTitle>
                  <CardDescription>All time invoice count</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{invoices.length}</div>
                </CardContent>
              </Card>

              {/* <Card className="animate-fade-in delay-200">
                <CardHeader>
                  <CardTitle>Recent Invoices</CardTitle>
                  <CardDescription>Latest generated invoices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground italic">
                    No recent invoices
                  </div>
                </CardContent>
              </Card> */}
            </div>

            <div className="mt-8 glass p-6 rounded-xl animate-fade-in delay-300">
              <Tabs defaultValue="create">
                <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
                  <TabsTrigger value="create">Create New</TabsTrigger>
                  <TabsTrigger value="history">Invoice History</TabsTrigger>
                </TabsList>

                <TabsContent value="create" className="mt-0">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Generate Bill</CardTitle>
                        <CardDescription>
                          Create a new travel invoice with automatic GST
                          calculation
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-6">
                          Fill in trip details, calculate costs, and generate a
                          professional PDF invoice in seconds.
                        </p>
                        <Button className="w-full">
                          <Link
                            to="/bill-generation"
                            className="flex items-center gap-2"
                          >
                            <Receipt className="h-4 w-4" />
                            Create Invoice
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Business Profile</CardTitle>
                        <CardDescription>
                          View and update your business information
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-6">
                          Review or update your business details that appear on
                          all your generated invoices.
                        </p>
                        <Button variant="outline" className="w-full" disabled>
                          <Link
                            to="/business-registration"
                            className="flex items-center gap-2"
                          >
                            <FileText className="h-4 w-4" />
                            View Profile
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Invoice History</CardTitle>
                      <CardDescription>
                        View and download previously generated invoices
                      </CardDescription>
                    </CardHeader>
                    {invoices.length > 0 ? (
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Invoice No.</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Customer</TableHead>
                              <TableHead>From</TableHead>
                              <TableHead>To</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead>Car</TableHead>
                              <TableHead>Action</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {invoices.map((invoice) => (
                              <TableRow key={invoice.invoice_number}>
                                <TableCell>{invoice.invoice_number}</TableCell>
                                <TableCell>{invoice.invoice_date}</TableCell>
                                <TableCell>{invoice.customer_name}</TableCell>
                                <TableCell>{invoice.from_location}</TableCell>
                                <TableCell>{invoice.to_location}</TableCell>
                                <TableCell>₹{invoice.total_amount}</TableCell>
                                <TableCell>{invoice.car_number}</TableCell>
                                <TableCell>
                                  <Button className="gap-1" size="sm">
                                    <Download className="h-4 w-4" />
                                    <PDFDownloadLink
                                      document={
                                        <InvoicePDFGenerator data={invoice} />
                                      }
                                      fileName={`Invoice_${invoice.invoice_number}.pdf`}
                                    >
                                      {({ loading }) => (
                                        <button>
                                          {loading
                                            ? "Generating PDF..."
                                            : "Download PDF"}
                                        </button>
                                      )}
                                    </PDFDownloadLink>
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    ) : (
                      <CardContent>
                        <div className="text-center py-8">
                          <p className="text-muted-foreground mb-4">
                            You haven't generated any invoices yet.
                          </p>
                          <Button className="group">
                            <Link
                              to="/bill-generation"
                              className="flex items-center gap-2"
                            >
                              Create Your First Invoice
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // If authenticated but no business profile, redirect to registration
  if (user && !userHasBusinessProfile) {
    return <Navigate to="/business-registration" />;
  }

  // Not authenticated, show sign-in page
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 px-6 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md animate-fade-in">
          <Card className="glass">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome to Billify</CardTitle>
              <CardDescription>
                Sign in to access your travel invoicing dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <AuthButton isLoading={loading} />

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  By signing in, you agree to our
                  <a href="#" className="text-primary ml-1">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
