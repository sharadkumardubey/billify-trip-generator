
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Check, FileText, PenTool, ReceiptText, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [active, setActive] = useState(false);

  // Animation trigger on scroll
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setActive(true);
    }
  };

  const { user, userHasBusinessProfile } = useAuth();
  console.log(userHasBusinessProfile)

  // Redirect if already has business profile
  if (userHasBusinessProfile) {
    console.log("User already has a business profile, redirecting to bill generation");
    return <Navigate to="/bill-generation" />;
  }

  // Add scroll event listener
  useState(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <section className="py-24 px-6 bg-secondary/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simplifying Invoice Generation for Travel Businesses</h2>
              <p className="text-lg text-muted-foreground">
                Our platform streamlines the billing process, letting you focus on what matters - 
                providing excellent travel experiences.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-background/80 backdrop-blur-sm animate-fade-in">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
                  <p className="text-muted-foreground">
                    Sign in seamlessly with Google authentication, ensuring your 
                    business data remains secure and accessible.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-background/80 backdrop-blur-sm animate-fade-in delay-100">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <PenTool className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Business Registration</h3>
                  <p className="text-muted-foreground">
                    Register your travel business details once and use them for all future 
                    invoices, saving you time and effort.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-background/80 backdrop-blur-sm animate-fade-in delay-200">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <ReceiptText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">GST Automation</h3>
                  <p className="text-muted-foreground">
                    Let our app handle complex GST calculations for your trips automatically, 
                    ensuring compliance with tax regulations.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-background/80 backdrop-blur-sm animate-fade-in delay-300">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">PDF Generation</h3>
                  <p className="text-muted-foreground">
                    Generate professional PDF invoices instantly that you can download, 
                    print, or send to your clients.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2 lg:col-span-2 bg-primary text-primary-foreground animate-fade-in delay-400">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-4">Ready to simplify your billing process?</h3>
                  <p className="mb-6 text-primary-foreground/90">
                    Start creating professional travel invoices today with our easy-to-use platform.
                  </p>
                  <Button variant="secondary" size="lg" className="group">
                    <Link to="/dashboard" className="flex items-center gap-2">
                      Get Started
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground">
                Our streamlined process makes invoice generation quick and easy.
              </p>
            </div>
            
            <Tabs defaultValue="step1" className="w-full">
              <TabsList className="grid grid-cols-1 md:grid-cols-3 max-w-3xl mx-auto h-auto p-1 mb-12">
                <TabsTrigger value="step1" className="py-3 data-[state=active]:text-primary">Sign In</TabsTrigger>
                <TabsTrigger value="step2" className="py-3 data-[state=active]:text-primary">Enter Details</TabsTrigger>
                <TabsTrigger value="step3" className="py-3 data-[state=active]:text-primary">Generate & Download</TabsTrigger>
              </TabsList>
              
              <div className="max-w-4xl mx-auto">
                <TabsContent value="step1" className="mt-0 animate-scale-in">
                  <Card>
                    <CardContent className="p-6 md:p-10 grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <div className="inline-block p-2 px-4 bg-primary/10 text-primary rounded-full text-sm font-medium">
                          Step 1
                        </div>
                        <h3 className="text-2xl font-semibold">Sign In With Google</h3>
                        <p className="text-muted-foreground">
                          Simply authenticate with your Google account for secure access to our platform.
                          New users will be prompted to register their business details.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-primary" />
                            <span>Secure authentication</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-primary" />
                            <span>No password to remember</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-primary" />
                            <span>Easy access from any device</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-muted rounded-xl p-6 flex items-center justify-center">
                        <div className="w-full max-w-xs p-4 bg-background rounded-lg soft-shadow animate-float">
                          <div className="w-full h-10 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg mb-4"></div>
                          <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                          <div className="w-full h-12 bg-primary rounded-lg mb-4 flex items-center justify-center">
                            <div className="w-32 h-4 bg-primary-foreground/30 rounded"></div>
                          </div>
                          <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                          <div className="w-2/3 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="step2" className="mt-0 animate-scale-in">
                  <Card>
                    <CardContent className="p-6 md:p-10 grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <div className="inline-block p-2 px-4 bg-primary/10 text-primary rounded-full text-sm font-medium">
                          Step 2
                        </div>
                        <h3 className="text-2xl font-semibold">Enter Trip Details</h3>
                        <p className="text-muted-foreground">
                          Fill in the details of your trip including start and end locations, 
                          distance, price, and GST rate.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-primary" />
                            <span>User-friendly form interface</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-primary" />
                            <span>Real-time cost calculation</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-primary" />
                            <span>Automatic GST application</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-muted rounded-xl p-6 flex items-center justify-center">
                        <div className="w-full max-w-xs p-4 bg-background rounded-lg soft-shadow animate-float">
                          <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                          </div>
                          <div className="w-full h-8 bg-gray-200 dark:bg-gray-700 rounded my-4"></div>
                          <div className="w-1/2 h-10 bg-primary rounded-lg ml-auto"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="step3" className="mt-0 animate-scale-in">
                  <Card>
                    <CardContent className="p-6 md:p-10 grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <div className="inline-block p-2 px-4 bg-primary/10 text-primary rounded-full text-sm font-medium">
                          Step 3
                        </div>
                        <h3 className="text-2xl font-semibold">Generate & Download Invoice</h3>
                        <p className="text-muted-foreground">
                          Preview your generated invoice and download it as a professional PDF 
                          that's ready to be shared with your clients.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-primary" />
                            <span>Professional invoice template</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-primary" />
                            <span>Instant PDF download</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-primary" />
                            <span>Client-ready documentation</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-muted rounded-xl p-6 flex items-center justify-center">
                        <div className="w-full max-w-xs p-4 bg-background rounded-lg soft-shadow animate-float">
                          <div className="w-full h-6 flex items-center justify-between mb-4">
                            <div className="w-16 h-6 bg-primary/20 rounded"></div>
                            <div className="w-12 h-6 bg-primary rounded"></div>
                          </div>
                          <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex flex-col items-center justify-center p-4">
                            <div className="w-3/4 h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                            <div className="w-2/3 h-3 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                            <div className="w-full grid grid-cols-2 gap-2">
                              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                            </div>
                          </div>
                          <div className="w-full flex justify-end">
                            <div className="w-1/2 h-10 bg-primary rounded-lg"></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-secondary/50 to-background">
          <div className="max-w-4xl mx-auto text-center glass p-10 md:p-16 rounded-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to streamline your billing process?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of travel businesses that are saving time and creating professional 
              invoices with our platform.
            </p>
            <Button size="lg" className="px-8 py-6 text-lg">
              <Link to="/dashboard" className="flex items-center gap-2">
                Get Started For Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="py-10 px-6 border-t">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="relative w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">B</span>
            </div>
            <span className="text-xl font-semibold">Billify</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Billify. All rights reserved.
          </div>
          
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
