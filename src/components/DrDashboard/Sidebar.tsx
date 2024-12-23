import React, { useState, useEffect } from 'react';
import { MessageSquare, Settings, Home, Calendar, Folder, Inbox, Send, BarChart, User, MoreHorizontal, LogOut, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { cn } from "../../lib/utils";
import { Button } from "../UI/Button";
import { ScrollArea } from "../../components/UI/Scroll-area";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from '../../context/AuthContext';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className, isMobileMenuOpen, setIsMobileMenuOpen, isOpen, setIsOpen }) => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <div 
        className={cn(
          "fixed top-4 left-4  z-50 md:hidden",
          isMobileMenuOpen ? "hidden" : "block"
        )}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      <div className={cn(
        "pb-12 bg-gray-50 fixed inset-y-0 left-0 z-50 transition-all duration-200 ease-in-out",
        isMobile ? (isMobileMenuOpen ? "w-64" : "w-0") : (isOpen ? "w-64" : "w-20"),
        className
      )}>
        <div 
          className={cn(
            "absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 cursor-pointer border border-gray-500",
            isMobile && "hidden"
          )}
          onClick={toggleSidebar}
        >
          {isOpen ? <ChevronLeft size={21} /> : <ChevronRight size={21} />}
        </div>
        <ScrollArea className="h-[calc(100vh-3.5rem)]">
          <div className="space-y-4 py-4">
            <div className="px-4 py-2">
              {(isOpen || isMobile) && (
                <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight flex justify-between items-center">
                  Ovalent
                  {isMobile && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className='bg-white rounded-full border border-gray-500'
                    >
                      <ChevronLeft size={21} />
                    </Button>
                  )}
                </h2>
              )}
              <div className="space-y-1">
                <Button variant="ghost" className={cn("w-full text-black justify-start gap-2", (!isOpen && !isMobile) && "justify-center px-0")}>
                  <Home size={20} className='text-black' />
                  <Link to="/dashboard/doctor" className={cn("flex items-center gap-2", (!isOpen && !isMobile) && "w-0 overflow-hidden")}>
                    <span className={cn((!isOpen && !isMobile) && "w-0 overflow-hidden")}>Dashboard</span>
                  </Link>
                </Button>
                <Button variant="ghost" className={cn("w-full text-black justify-start gap-2", (!isOpen && !isMobile) && "justify-center px-0")}>
                  <Calendar size={20} className='text-black' />
                  <Link to="events" className={cn("flex items-center gap-2", (!isOpen && !isMobile) && "w-0 overflow-hidden")}>
                    <span className={cn((!isOpen && !isMobile) && "w-0 overflow-hidden")}>Events</span>
                  </Link>
                </Button>
                <Button variant="ghost" className={cn("w-full text-black justify-start gap-2", (!isOpen && !isMobile) && "justify-center px-0")}>
                  <Folder size={20} className='text-black' />
                  <Link to="manage" className={cn("flex items-center gap-2", (!isOpen && !isMobile) && "w-0 overflow-hidden")}>
                    <span className={cn((!isOpen && !isMobile) && "w-0 overflow-hidden")}>Manage</span>
                  </Link>
                </Button>
                <Button variant="ghost" className={cn("w-full text-black justify-start gap-2", (!isOpen && !isMobile) && "justify-center px-0")}>
                  <Send size={20} className='text-black' />
                  <Link to="messages" className={cn("flex items-center gap-2", (!isOpen && !isMobile) && "w-0 overflow-hidden")}>
                    <span className={cn((!isOpen && !isMobile) && "w-0 overflow-hidden")}>Messages</span>
                  </Link>
                </Button>
                <Button variant="ghost" className={cn("w-full text-black justify-start gap-2", (!isOpen && !isMobile) && "justify-center px-0")}>
                  <Inbox size={20} className='text-black' />
                  <Link to="inbox" className={cn("flex items-center gap-2", (!isOpen && !isMobile) && "w-0 overflow-hidden")}>
                    <span className={cn((!isOpen && !isMobile) && "w-0 overflow-hidden")}>Inbox</span>
                  </Link>
                </Button>
                <Button variant="ghost" className={cn("w-full text-black justify-start gap-2", (!isOpen && !isMobile) && "justify-center px-0")}>
                  <BarChart size={20} className='text-black' />
                  <Link to="reports" className={cn("flex items-center gap-2", (!isOpen && !isMobile) && "w-0 overflow-hidden")}>
                    <span className={cn((!isOpen && !isMobile) && "w-0 overflow-hidden")}>Reports</span>
                  </Link>
                </Button>
                <Button variant="ghost" className={cn("w-full text-black justify-start gap-2", (!isOpen && !isMobile) && "justify-center px-0")}>
                  <User size={20} className='text-black' />
                  <Link to="profile" className={cn("flex items-center gap-2", (!isOpen && !isMobile) && "w-0 overflow-hidden")}>
                    <span className={cn((!isOpen && !isMobile) && "w-0 overflow-hidden")}>Profile</span>
                  </Link>
                </Button>
                <Button variant="ghost" className={cn("w-full text-black justify-start gap-2", (!isOpen && !isMobile) && "justify-center px-0")}>
                  <MoreHorizontal size={20} className='text-black' />
                  <span className={cn("flex items-center gap-2", (!isOpen && !isMobile) && "w-0 overflow-hidden")}>More</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-auto px-4 py-2">
            <div className="space-y-1">
              <Button variant="ghost" className={cn("w-full text-black justify-start gap-2", (!isOpen && !isMobile) && "justify-center px-0")}>
                <MessageSquare size={20} className='text-black' />
                <span className={cn("flex items-center gap-2", (!isOpen && !isMobile) && "w-0 overflow-hidden")}>Feedback</span>
              </Button>
              <Button variant="ghost" className={cn("w-full text-black justify-start gap-2", (!isOpen && !isMobile) && "justify-center px-0")}>
                <Settings size={20} className='text-black' />
                <Link to="settings" className={cn("flex items-center gap-2", (!isOpen && !isMobile) && "w-0 overflow-hidden")}>
                  <span className={cn((!isOpen && !isMobile) && "w-0 overflow-hidden")}>Settings</span>
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                className={cn("w-full justify-start bg-blue-700 text-gray-100 gap-2 hover:bg-gray-900", (!isOpen && !isMobile) && "justify-center px-0")}
                onClick={handleLogout}
              >
                <LogOut size={20} className='text-white' />
                <span className={cn((!isOpen && !isMobile) && "w-0 overflow-hidden")}>Sign Out</span>
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}

export default Sidebar;

