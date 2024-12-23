import React, { useState } from 'react';
import { MessageSquare, Settings, Home, Calendar, Folder, Inbox, BarChart, User, MoreHorizontal, LogOut, ChevronDown, ChevronRight, UserPlus, Users } from 'lucide-react';
import { cn } from "../../lib/utils";
import { Button } from "../UI/Button";
import { ScrollArea } from "../../components/UI/Scroll-area";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from '../../context/AuthContext';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const [isManageOpen, setIsManageOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleManage = () => {
    setIsManageOpen(!isManageOpen);
  };

  return (
    <div className={cn("pb-12 bg-gray-50", className)}>
      <ScrollArea className="h-[calc(100vh-3.5rem)]">
        <div className="space-y-4 py-4">
          <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight">
              Ovalent
            </h2>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Home size={20} />
                <Link to="/dashboard/doctor">Dashboard</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Calendar size={20} />
                <Link to="events">Events</Link>
              </Button>
              <div>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2"
                  onClick={toggleManage}
                >
                  <Folder size={20} />
                  <span>Manage</span>
                  {isManageOpen ? <ChevronDown size={16} className="ml-auto" /> : <ChevronRight size={16} className="ml-auto" />}
                </Button>
                {isManageOpen && (
                  <div className="ml-6 space-y-1 mt-1">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <UserPlus size={20} />
                      <Link to="doctors">Doctors</Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <Users size={20} />
                      <Link to="patients">Patients</Link>
                    </Button>
                  </div>
                )}
              </div>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Inbox size={20} />
                <Link to="inbox">Inbox</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <BarChart size={20} />
                <Link to="reports">Reports</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <User size={20} />
                <Link to="profile">Profile</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <MoreHorizontal size={20} />
                More
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-auto px-4 py-2">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <MessageSquare size={20} />
              Feedback
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings size={20} />
              <Link to="settings">Settings</Link>
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              Sign Out
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export default Sidebar;

