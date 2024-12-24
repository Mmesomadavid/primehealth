import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './UI/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './UI/Tabs';
import EmptyBox from '../assets/empty-box.png';
import EmptyCalendar from '../assets/empty-calendar.gif';

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ isOpen, onClose }) => {
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      // Replace with your API endpoint
      const response = await fetch(`${url}/api/notifications`);
      const data = await response.json();
      setNotifications(data.notifications);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-50"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-[500px] bg-white shadow-lg z-50"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">Notifications</h2>
                <Button variant="ghost" size="icon" onClick={onClose} className="border border-gray-300">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <Tabs defaultValue="notifications" className="flex-1">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="notifications" className="flex font-medium items-center Open-Sans gap-2">
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="appointments" className="flex font-medium items-center text-sm Open-Sans gap-2">
                    Appointments
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="notifications" className="flex-1 overflow-hidden custom-scrollbar items-center justify-center h-screen">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center h-full p-6">
                      <p className="text-sm text-gray-500">Loading notifications...</p>
                    </div>
                  ) : notifications.length > 0 ? (
                    <ul className="space-y-4">
                      {notifications.map((notification) => (
                        <li
                          key={notification.id}
                          className="p-4 border rounded-md shadow-sm hover:bg-gray-50"
                        >
                          <h3 className="text-lg font-semibold">{notification.title}</h3>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                          <span className="text-xs text-gray-400">{notification.timestamp}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full p-6">
                      <img
                        src={EmptyBox}
                        alt="No notifications"
                        className="w-16 h-16 mb-4"
                      />
                      <h3 className="text-lg font-medium text-gray-900">No notifications</h3>
                      <p className="text-sm text-gray-500">You're all caught up!</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="appointments" className="flex-1 overflow-hidden custom-scrollbar items-center justify-center h-screen">
                  <div className="flex flex-col items-center justify-center h-full p-6">
                    <img
                      src={EmptyCalendar}
                      alt="No appointments"
                      className="w-16 h-16 mb-4"
                    />
                    <h3 className="text-lg font-medium text-gray-900">No appointments</h3>
                    <p className="text-sm text-gray-500">You have no upcoming appointments</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationsPanel;
