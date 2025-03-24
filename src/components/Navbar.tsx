
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  isAuthenticated?: boolean;
  onSignOut?: () => void;
}

const Navbar = ({ isAuthenticated: forcedAuth, onSignOut }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut: contextSignOut } = useAuth();
  
  const isAuthenticated = forcedAuth !== undefined ? forcedAuth : !!user;
  
  const handleSignOut = () => {
    if (onSignOut) {
      onSignOut();
    } else if (contextSignOut) {
      contextSignOut();
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-10 glass">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-full bg-primary flex items-center justify-center animate-pulse-subtle">
            <span className="text-primary-foreground font-bold">B</span>
          </div>
          <span className="text-xl font-semibold">Billify</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="text-foreground/80 hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link to="/bill-generation" className="text-foreground/80 hover:text-foreground transition-colors">
                Generate Bill
              </Link>
            </>
          )}
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            About
          </Link>
          {isAuthenticated ? (
            <Button variant="outline" onClick={onSignOut}>
              Sign Out
            </Button>
          ) : (
            <Button>
              <Link to="/dashboard">Get Started</Link>
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 top-16 bg-background z-40 md:hidden p-6 flex flex-col gap-6 transform transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <Link
          to="/"
          className="text-lg py-3 border-b border-muted"
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        {isAuthenticated && (
          <>
            <Link
              to="/dashboard"
              className="text-lg py-3 border-b border-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/bill-generation"
              className="text-lg py-3 border-b border-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              Generate Bill
            </Link>
          </>
        )}
        <Link
          to="/"
          className="text-lg py-3 border-b border-muted"
          onClick={() => setIsMenuOpen(false)}
        >
          About
        </Link>
        {isAuthenticated ? (
          <Button variant="outline" onClick={onSignOut} className="mt-4">
            Sign Out
          </Button>
        ) : (
          <Button className="mt-4" onClick={() => setIsMenuOpen(false)}>
            <Link to="/dashboard">Get Started</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
