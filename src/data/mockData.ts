import { User, SupportTicket, Product, Order } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    createdAt: '2024-01-15T08:30:00Z',
    lastLogin: '2024-01-20T14:22:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Manager',
    status: 'Active',
    createdAt: '2024-01-16T09:15:00Z',
    lastLogin: '2024-01-20T16:45:00Z'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'User',
    status: 'Inactive',
    createdAt: '2024-01-17T11:00:00Z',
    lastLogin: '2024-01-18T10:30:00Z'
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'User',
    status: 'Active',
    createdAt: '2024-01-18T13:45:00Z',
    lastLogin: '2024-01-20T12:15:00Z'
  },
  {
    id: '5',
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    role: 'Manager',
    status: 'Active',
    createdAt: '2024-01-19T15:30:00Z',
    lastLogin: '2024-01-20T17:00:00Z'
  }
];

export const mockTickets: SupportTicket[] = [
  {
    id: 'TKT-001',
    subject: 'Login Issues',
    description: 'Unable to login to the system with correct credentials.',
    priority: 'High',
    status: 'Open',
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-01-20T09:00:00Z',
    assignedUserId: '1',
    customerId: '2',
    comments: [
      {
        id: 'c1',
        content: 'This issue has been reported by multiple users.',
        authorId: '1',
        createdAt: '2024-01-20T09:30:00Z'
      }
    ]
  },
  {
    id: 'TKT-002',
    subject: 'Feature Request: Dark Mode',
    description: 'Request for dark mode implementation in the dashboard.',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '2024-01-19T14:30:00Z',
    updatedAt: '2024-01-20T10:15:00Z',
    assignedUserId: '2',
    customerId: '3',
    comments: []
  },
  {
    id: 'TKT-003',
    subject: 'Bug: Incorrect Data Display',
    description: 'Some data is not displaying correctly in the reports section.',
    priority: 'Low',
    status: 'Closed',
    createdAt: '2024-01-18T16:20:00Z',
    updatedAt: '2024-01-19T11:45:00Z',
    assignedUserId: '1',
    customerId: '4',
    comments: [
      {
        id: 'c2',
        content: 'Issue has been resolved with the latest update.',
        authorId: '1',
        createdAt: '2024-01-19T11:45:00Z'
      }
    ]
  }
];

export const mockProducts: Product[] = [
  {
    id: 'P001',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 99.99,
    stock: 45,
    status: 'In Stock',
    description: 'High-quality wireless headphones with noise cancellation.',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'P002',
    name: 'Smartphone Case',
    category: 'Accessories',
    price: 24.99,
    stock: 5,
    status: 'Low Stock',
    description: 'Durable smartphone case with drop protection.',
    createdAt: '2024-01-16T11:30:00Z'
  },
  {
    id: 'P003',
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    price: 79.99,
    stock: 0,
    status: 'Out of Stock',
    description: 'Portable bluetooth speaker with excellent sound quality.',
    createdAt: '2024-01-17T14:15:00Z'
  },
  {
    id: 'P004',
    name: 'USB Charging Cable',
    category: 'Accessories',
    price: 12.99,
    stock: 120,
    status: 'In Stock',
    description: 'Fast charging USB cable compatible with most devices.',
    createdAt: '2024-01-18T09:45:00Z'
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Michael Chen',
    customerEmail: 'michael.chen@example.com',
    status: 'Delivered',
    orderDate: '2024-01-20T08:30:00Z',
    totalAmount: 124.98,
    items: [
      { productId: 'P001', productName: 'Wireless Headphones', quantity: 1, price: 99.99 },
      { productId: 'P002', productName: 'Smartphone Case', quantity: 1, price: 24.99 }
    ],
    statusHistory: [
      { status: 'Pending', timestamp: '2024-01-20T08:30:00Z' },
      { status: 'Shipped', timestamp: '2024-01-20T14:00:00Z', note: 'Shipped via FedEx' },
      { status: 'Delivered', timestamp: '2024-01-21T16:30:00Z' }
    ]
  },
  {
    id: 'ORD-002',
    customerName: 'Sarah Williams',
    customerEmail: 'sarah.williams@example.com',
    status: 'Shipped',
    orderDate: '2024-01-19T15:45:00Z',
    totalAmount: 79.99,
    items: [
      { productId: 'P003', productName: 'Bluetooth Speaker', quantity: 1, price: 79.99 }
    ],
    statusHistory: [
      { status: 'Pending', timestamp: '2024-01-19T15:45:00Z' },
      { status: 'Shipped', timestamp: '2024-01-20T09:20:00Z', note: 'Shipped via UPS' }
    ]
  },
  {
    id: 'ORD-003',
    customerName: 'David Martinez',
    customerEmail: 'david.martinez@example.com',
    status: 'Pending',
    orderDate: '2024-01-20T12:15:00Z',
    totalAmount: 38.97,
    items: [
      { productId: 'P004', productName: 'USB Charging Cable', quantity: 3, price: 12.99 }
    ],
    statusHistory: [
      { status: 'Pending', timestamp: '2024-01-20T12:15:00Z' }
    ]
  }
];