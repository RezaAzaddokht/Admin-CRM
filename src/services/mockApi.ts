import { User, SupportTicket, Product, Order, TicketComment, DashboardStats } from '../types';
import { mockUsers, mockTickets, mockProducts, mockOrders } from '../data/mockData';

// Simulated delay for API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Local storage keys
const STORAGE_KEYS = {
  USERS: 'admin_dashboard_users',
  TICKETS: 'admin_dashboard_tickets', 
  PRODUCTS: 'admin_dashboard_products',
  ORDERS: 'admin_dashboard_orders'
};

// Initialize local storage with mock data if not exists
const initializeLocalStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TICKETS)) {
    localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(mockTickets));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(mockProducts));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(mockOrders));
  }
};

// Generic CRUD operations
class MockApiService<T extends { id: string }> {
  constructor(private storageKey: string) {}

  private getData(): T[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveData(data: T[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  async getAll(): Promise<T[]> {
    await delay(300);
    return this.getData();
  }

  async getById(id: string): Promise<T | null> {
    await delay(200);
    const data = this.getData();
    return data.find(item => item.id === id) || null;
  }

  async create(item: T): Promise<T> {
    await delay(400);
    const data = this.getData();
    data.push(item);
    this.saveData(data);
    return item;
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    await delay(400);
    const data = this.getData();
    const index = data.findIndex(item => item.id === id);
    if (index === -1) throw new Error('Item not found');
    
    data[index] = { ...data[index], ...updates };
    this.saveData(data);
    return data[index];
  }

  async delete(id: string): Promise<void> {
    await delay(300);
    const data = this.getData();
    const filteredData = data.filter(item => item.id !== id);
    this.saveData(filteredData);
  }
}

// Initialize storage
initializeLocalStorage();

// Service instances
export const usersApi = new MockApiService<User>(STORAGE_KEYS.USERS);
export const productsApi = new MockApiService<Product>(STORAGE_KEYS.PRODUCTS);
export const ordersApi = new MockApiService<Order>(STORAGE_KEYS.ORDERS);

// Custom tickets API with comment support
class TicketsApiService extends MockApiService<SupportTicket> {
  async addComment(ticketId: string, comment: Omit<TicketComment, 'id'>): Promise<TicketComment> {
    await delay(300);
    const data = this.getData();
    const ticket = data.find(t => t.id === ticketId);
    if (!ticket) throw new Error('Ticket not found');

    const newComment: TicketComment = {
      ...comment,
      id: `c${Date.now()}`,
    };

    ticket.comments.push(newComment);
    ticket.updatedAt = new Date().toISOString();
    this.saveData(data);
    return newComment;
  }
}

export const ticketsApi = new TicketsApiService(STORAGE_KEYS.TICKETS);

// Dashboard stats API
export const getDashboardStats = async (): Promise<DashboardStats> => {
  await delay(200);
  const users = await usersApi.getAll();
  const tickets = await ticketsApi.getAll();
  const orders = await ordersApi.getAll();

  const today = new Date().toDateString();
  const todayOrders = orders.filter(order => 
    new Date(order.orderDate).toDateString() === today
  );

  return {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'Active').length,
    openTickets: tickets.filter(t => t.status === 'Open').length,
    todayOrders: todayOrders.length,
    todayRevenue: todayOrders.reduce((sum, order) => sum + order.totalAmount, 0)
  };
};

// Auth API
export const authApi = {
  login: async (username: string, password: string) => {
    await delay(500);
    if (username === 'admin' && password === 'admin') {
      return { username: 'admin', role: 'Admin' };
    }
    throw new Error('Invalid credentials');
  }
};