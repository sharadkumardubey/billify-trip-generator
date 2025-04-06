import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, FileText, Info, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  isAuthenticated?: boolean;
  onSignOut?: () => void;
}

const Navbar = ({ isAuthenticated: forcedAuth, onSignOut }: NavbarProps) => {
  const { user, signOut: contextSignOut } = useAuth();

  const isAuthenticated = forcedAuth !== undefined ? forcedAuth : !!user;

  const handleSignOut = () => {
    if (onSignOut) {
      onSignOut();
    } else if (contextSignOut) {
      contextSignOut();
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50 py-2 md:py-4 px-6 md:px-10 glass">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-full bg-primary flex items-center justify-center animate-pulse-subtle">
            <span className="text-primary-foreground font-bold">B</span>
          </div>
          <span className="hidden md:block text-xl font-semibold">Billify</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Home
          </Link>
          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/bill-generation"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Generate Bill
              </Link>
            </>
          )}
          <Link
            to="/"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            About
          </Link>
          {isAuthenticated ? (
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <Button>
              <Link to="/dashboard">Get Started</Link>
            </Button>
          )}
        </nav>

        {/* Mobile Bottom Navigation */}

        <nav className="w-full z-50 md:hidden flex justify-around items-center py-2">
          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className="flex flex-col items-center text-xs text-foreground hover:text-primary"
              >
                <Home size={20} />
                <span>Home</span>
              </Link>
              <Link
                to="/bill-generation"
                className="flex flex-col items-center text-xs text-foreground hover:text-primary"
              >
                <FileText size={20} />
                <span>Bill</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="flex flex-col items-center text-xs text-red-600 hover:text-primary"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </>
          )}
          <Link
            to="/"
            className="flex flex-col items-center text-xs text-foreground hover:text-primary"
          >
            <Info size={20} />
            <span>About</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
