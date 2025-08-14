import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Ticket, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out');
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-primary/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Ticket className="h-7 w-7 text-accent" />
            <span className="font-bold text-xl text-white">DynamicTickets</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentUser && (
              <span className="text-sm text-gray-300">
                Welcome, {currentUser.email}
              </span>
            )}
            <ConnectButton chainStatus="icon" showBalance={false} />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
