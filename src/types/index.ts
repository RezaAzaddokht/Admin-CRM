export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Manager';
  status: 'Active' | 'Inactive';
  createdAt: string;
  lastLogin?: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Closed';
  createdAt: string;
  updatedAt: string;
  assignedUserId?: string;
  customerId: string;
  comments: TicketComment[];
}

export interface TicketComment {
  id: string;
  content: string;
  authorId: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  description: string;
  createdAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  orderDate: string;
  totalAmount: number;
  items: OrderItem[];
  statusHistory: OrderStatusHistory[];
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface OrderStatusHistory {
  status: Order['status'];
  timestamp: string;
  note?: string;
}

export interface AuthUser {
  username: string;
  role: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  openTickets: number;
  todayOrders: number;
  todayRevenue: number;
}