import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';
import { getDashboardStats, usersApi, ticketsApi, ordersApi } from '../services/mockApi';
import { DashboardStats, User, SupportTicket, Order } from '../types';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);

const AnalyticsPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const [statsData, usersData, ticketsData, ordersData] = await Promise.all([
        getDashboardStats(),
        usersApi.getAll(),
        ticketsApi.getAll(),
        ordersApi.getAll()
      ]);
      
      setStats(statsData);
      setUsers(usersData);
      setTickets(ticketsData);
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Chart data preparations
  const ticketStatusData = {
    labels: ['Open', 'In Progress', 'Closed'],
    datasets: [
      {
        data: [
          tickets.filter(t => t.status === 'Open').length,
          tickets.filter(t => t.status === 'In Progress').length,
          tickets.filter(t => t.status === 'Closed').length
        ],
        backgroundColor: [
          '#3B82F6', // blue
          '#F59E0B', // amber
          '#10B981'  // emerald
        ],
        borderColor: [
          '#2563EB',
          '#D97706',
          '#059669'
        ],
        borderWidth: 2
      }
    ]
  };

  const userRolesData = {
    labels: ['Admin', 'Manager', 'User'],
    datasets: [
      {
        data: [
          users.filter(u => u.role === 'Admin').length,
          users.filter(u => u.role === 'Manager').length,
          users.filter(u => u.role === 'User').length
        ],
        backgroundColor: [
          '#8B5CF6', // purple
          '#3B82F6', // blue
          '#6B7280'  // gray
        ],
        borderColor: [
          '#7C3AED',
          '#2563EB',
          '#4B5563'
        ],
        borderWidth: 2
      }
    ]
  };

  // Orders over time (last 7 days)
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const last7Days = getLast7Days();
  const ordersTimeData = {
    labels: last7Days.map(date => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    datasets: [
      {
        label: 'Orders',
        data: last7Days.map(date => 
          orders.filter(order => 
            new Date(order.orderDate).toISOString().split('T')[0] === date
          ).length
        ),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const orderStatusData = {
    labels: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    datasets: [
      {
        label: 'Number of Orders',
        data: [
          orders.filter(o => o.status === 'Pending').length,
          orders.filter(o => o.status === 'Shipped').length,
          orders.filter(o => o.status === 'Delivered').length,
          orders.filter(o => o.status === 'Cancelled').length
        ],
        backgroundColor: [
          '#F59E0B', // amber
          '#3B82F6', // blue
          '#10B981', // emerald
          '#EF4444'  // red
        ]
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151'
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? '#374151' : '#E5E7EB'
        }
      },
      y: {
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151'
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? '#374151' : '#E5E7EB'
        }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151'
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics & Reports</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Insights and metrics for your admin dashboard
        </p>
      </div>

      {/* Key Metrics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-500">
                <span className="text-white text-xl">👥</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeUsers}</p>
              </div>
              <div className="p-3 rounded-full bg-green-500">
                <span className="text-white text-xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Open Tickets</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.openTickets}</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-500">
                <span className="text-white text-xl">🎫</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Orders</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.todayOrders}</p>
              </div>
              <div className="p-3 rounded-full bg-purple-500">
                <span className="text-white text-xl">📦</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Revenue</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">${stats.todayRevenue.toFixed(2)}</p>
              </div>
              <div className="p-3 rounded-full bg-indigo-500">
                <span className="text-white text-xl">💰</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ticket Status Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Ticket Status Distribution
          </h3>
          <div className="h-64">
            <Pie data={ticketStatusData} options={pieOptions} />
          </div>
        </div>

        {/* User Roles Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            User Roles Breakdown
          </h3>
          <div className="h-64">
            <Pie data={userRolesData} options={pieOptions} />
          </div>
        </div>

        {/* Orders Over Time */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Orders Over Last 7 Days
          </h3>
          <div className="h-64">
            <Line data={ordersTimeData} options={chartOptions} />
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Order Status Overview
          </h3>
          <div className="h-64">
            <Bar data={orderStatusData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Summary Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {((stats?.activeUsers || 0) / (stats?.totalUsers || 1) * 100).toFixed(1)}%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">User Activity Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {tickets.filter(t => t.status === 'Closed').length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Resolved Tickets</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              ${orders.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              ${orders.length > 0 ? (orders.reduce((sum, order) => sum + order.totalAmount, 0) / orders.length).toFixed(2) : '0.00'}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Order Value</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;