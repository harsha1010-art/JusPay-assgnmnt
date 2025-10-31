import React from 'react';
import { useNotifications } from '../context/NotificationContext';
import { X } from 'lucide-react';

const NotificationSidebar = () => {
  const { isOpen, toggleNotifications } = useNotifications();

  return (
    <div
      className={`fixed top-0 right-0 h-screen w-80 bg-card border-l border-default shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-default">
        <h2 className="text-lg font-semibold text-primary">Notifications</h2>
        <button
          onClick={toggleNotifications}
          className="text-secondary hover:text-primary transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Notification List */}
      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-64px)]">
        {/* Sample notifications - you can replace these with real data */}
        <NotificationItem
          title="New Message"
          description="John Doe sent you a message"
          time="5m ago"
          isUnread
        />
        <NotificationItem
          title="System Update"
          description="Your system has been updated successfully"
          time="1h ago"
        />
        <NotificationItem
          title="Reminder"
          description="Meeting with the team at 2 PM"
          time="2h ago"
        />
      </div>
    </div>
  );
};

const NotificationItem = ({ title, description, time, isUnread }) => (
  <div className={`p-3 rounded-lg ${isUnread ? 'bg-hover' : ''} cursor-pointer hover:bg-hover transition-colors`}>
    <div className="flex justify-between items-start mb-1">
      <h3 className={`font-medium ${isUnread ? 'text-primary' : 'text-secondary'}`}>
        {title}
      </h3>
      <span className="text-xs text-secondary">{time}</span>
    </div>
    <p className="text-sm text-secondary">{description}</p>
  </div>
);

export default NotificationSidebar;