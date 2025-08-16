import React, { useState, useEffect } from 'react';
import { 
  UsersIcon, 
  TicketIcon, 
  ShoppingCartIcon, 
  CurrencyDollarIcon,
  ArrowUpIcon,
  ArrowDownIcon 
} from '@heroicons/react/24/outline';
import { getDashboardStats } from '../services/mockApi';
import { DashboardStats } from '../types';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  trend?: number;
  format?: 'number' | 'currency';
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  trend, 
  format = 'number' 
}) => {
  const formatValue = (val: number) => {
    if (format === 'currency') {
      return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' 
      }).format(val);
    }
    return val.toLocaleString();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {formatValue(value)}
          </p>
          {trend !== undefined && (
            <div className="flex items-center mt-2">
              {trend > 0 ? (
                <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <ArrowDownIcon className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                trend > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {Math.abs(trend)}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Failed to load dashboard data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Here's what's happening with your admin panel today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          icon={UsersIcon}
          color="bg-blue-500"
          trend={12}
        />
        
        <StatsCard
          title="Active Users"
          value={stats.activeUsers}
          icon={UsersIcon}
          color="bg-green-500"
          trend={8}
        />
        
        <StatsCard
          title="Open Tickets"
          value={stats.openTickets}
          icon={TicketIcon}
          color="bg-yellow-500"
          trend={-5}
        />
        
        <StatsCard
          title="Today's Orders"
          value={stats.todayOrders}
          icon={ShoppingCartIcon}
          color="bg-purple-500"
          trend={15}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                New user registered: John Doe
              </p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Order #ORD-001 was delivered
              </p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Support ticket TKT-002 updated
              </p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Low stock alert: Bluetooth Speaker
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 text-center border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <UsersIcon className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Add User</span>
            </button>
            <button className="p-4 text-center border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <TicketIcon className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">New Ticket</span>
            </button>
            <button className="p-4 text-center border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <ShoppingCartIcon className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">View Orders</span>
            </button>
            <button className="p-4 text-center border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <CurrencyDollarIcon className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Analytics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;