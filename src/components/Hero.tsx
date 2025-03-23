
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <div className="w-full min-h-[90vh] flex flex-col items-center justify-center py-20 px-6">
      <div className="w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col space-y-6 md:pr-10 animate-fade-in">
          <div className="p-2 px-4 bg-primary/10 text-primary rounded-full w-fit text-sm font-medium flex items-center">
            <span>Streamline your travel business</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Create professional travel invoices in seconds
          </h1>
          <p className="text-lg text-muted-foreground">
            Generate customized bills for your tour and travel business with ease.
            Automate GST calculations and create beautiful, professional invoices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="group">
              <Link to="/dashboard" className="flex items-center gap-2">
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Secure Google sign-in</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Automated calculations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Download as PDF</span>
            </div>
          </div>
        </div>
        
        <div className="relative rounded-xl overflow-hidden h-[400px] md:h-[500px] animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-xl"></div>
          <div className="glass absolute top-10 left-6 right-6 p-6 rounded-xl animate-float">
            <div className="w-full h-6 flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <div className="w-40 h-3 bg-gray-200 dark:bg-gray-700 rounded-full ml-auto"></div>
            </div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2"></div>
              <div className="h-12 bg-primary rounded-lg w-1/3 ml-auto"></div>
            </div>
          </div>
          <div className="glass absolute bottom-10 right-6 left-20 p-6 rounded-xl animate-float delay-75">
            <div className="flex justify-between mb-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/4"></div>
            </div>
            <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-10 bg-primary rounded-lg w-1/4 mt-4 ml-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
