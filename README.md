# Professional Admin Dashboard

A comprehensive, production-ready admin dashboard built with React, TypeScript, and modern web technologies.

## 🚀 Features

### Authentication & Security
- **Login-only authentication** with fixed credentials (admin/admin)
- **Protected routes** - unauthorized users are redirected to login
- **Persistent sessions** using localStorage
- **Automatic session management**

### Dashboard Layout
- **Responsive design** that works on desktop and tablet
- **Collapsible sidebar** navigation
- **Dark mode support** with system preference detection
- **Modern UI** using Tailwind CSS and Headless UI components

### Core Modules

#### 👥 User Management
- Complete CRUD operations for user accounts
- Search and filter by role (Admin/Manager/User) and status
- User profile management with role-based permissions
- Real-time status updates and activity tracking

#### 🎫 Support Tickets
- Full ticket lifecycle management (Open → In Progress → Closed)
- Priority levels (Low/Medium/High) with visual indicators
- Comment system for ticket collaboration
- Assignment to team members
- Filtering and sorting capabilities

#### 📦 Products
- Product catalog with CRUD operations
- Category management and filtering
- Stock level tracking with automatic status updates
- Price management and product descriptions

#### 🛒 Orders
- Order management with status tracking
- Customer information and order history
- Status updates (Pending → Shipped → Delivered → Cancelled)
- Order timeline and status history

#### 📊 Analytics & Reports
- **Interactive dashboards** with real-time metrics
- **Chart visualizations** using Chart.js:
  - Ticket status distribution (pie charts)
  - User role breakdown
  - Order trends over time (line charts)
  - Revenue analytics
- **Key performance indicators** with trend analysis

#### ⚙️ Settings
- Admin password change functionality
- Theme switching (Light/Dark mode)
- Notification preferences management
- Account information display

## 🛠 Technical Architecture

### Frontend Stack
- **React 18** with functional components and hooks
- **TypeScript** for type safety and better development experience
- **Tailwind CSS** for responsive, utility-first styling
- **React Router** for client-side navigation
- **Context API** for state management (Auth & Theme)

### Mock API Layer
- **Simulated backend** using localStorage for data persistence
- **Realistic API delays** to simulate network requests
- **CRUD operations** with proper error handling
- **Modular service architecture** for easy backend integration

### State Management
- **React Context** for global state (authentication, theme)
- **Local component state** for UI interactions
- **Persistent storage** using localStorage
- **Optimistic updates** for better user experience

### Code Organization
- **Modular architecture** with clear separation of concerns
- **TypeScript interfaces** for all data models
- **Reusable components** and custom hooks
- **Service layer abstraction** for API calls

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Layout components (Sidebar, Navbar)
│   └── ProtectedRoute.tsx
├── contexts/           # React Context providers
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── data/              # Mock data for development
│   └── mockData.ts
├── pages/             # Page components
│   ├── DashboardPage.tsx
│   ├── UsersPage.tsx
│   ├── TicketsPage.tsx
│   ├── ProductsPage.tsx
│   ├── OrdersPage.tsx
│   ├── AnalyticsPage.tsx
│   └── SettingsPage.tsx
├── services/          # API service layer
│   └── mockApi.ts
├── types/             # TypeScript type definitions
│   └── index.ts
└── App.tsx           # Main application component
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Modern web browser

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd admin-dashboard
npm install
```

2. **Start the development server:**
```bash
npm run dev
```

3. **Open your browser and navigate to:**
```
http://localhost:5173
```

4. **Login with demo credentials:**
- Username: `admin`
- Password: `admin`

## 🔄 Replacing Mock API with Real Backend

The application is designed to easily integrate with a real backend API. Follow these steps:

### 1. Update API Service Layer

Replace the mock API calls in `src/services/mockApi.ts`:

```typescript
// Replace this mock implementation
export const usersApi = new MockApiService<User>(STORAGE_KEYS.USERS);

// With real API calls
export const usersApi = {
  getAll: () => fetch('/api/users').then(res => res.json()),
  getById: (id: string) => fetch(`/api/users/${id}`).then(res => res.json()),
  create: (user: User) => fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }).then(res => res.json()),
  // ... other methods
};
```

### 2. Update Authentication

Modify `src/contexts/AuthContext.tsx` to use your authentication endpoint:

```typescript
const login = async (username: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  if (response.ok) {
    const user = await response.json();
    // Handle successful login
  } else {
    throw new Error('Invalid credentials');
  }
};
```

### 3. Update Data Models

Modify TypeScript interfaces in `src/types/index.ts` to match your backend API:

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  // Add/modify fields as needed for your backend
}
```

### 4. Environment Configuration

Create a `.env` file for API configuration:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Admin Dashboard
```

## 🎨 Customization

### Theme Colors
Update colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6', // Change primary color
        600: '#2563eb',
        700: '#1d4ed8',
      }
    }
  }
}
```

### Dashboard Metrics
Add new metrics in `src/pages/AnalyticsPage.tsx`:

```typescript
const customMetric = {
  title: 'Custom Metric',
  value: customValue,
  icon: CustomIcon,
  color: 'bg-custom-500'
};
```

## 🧪 Testing

Run the test suite:

```bash
npm run test        # Run all tests
npm run test:watch  # Run tests in watch mode
npm run test:coverage  # Run tests with coverage report
```

## 📱 Mobile Responsiveness

The dashboard is fully responsive with breakpoints:
- **Mobile**: < 768px (single column layout)
- **Tablet**: 768px - 1024px (adapted layouts)
- **Desktop**: > 1024px (full multi-column layouts)

## 🔒 Security Considerations

- **Input validation** on all form submissions
- **XSS protection** through React's built-in sanitization
- **Authentication state management** with secure logout
- **Route protection** for unauthorized access prevention

## 📊 Performance Features

- **Lazy loading** for better initial page load
- **Optimistic updates** for immediate UI feedback
- **Efficient re-rendering** using React best practices
- **Local storage caching** for improved performance

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Various Platforms
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the `dist` folder
- **AWS S3**: Upload the `dist` folder contents

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📞 Support

For questions or support, please open an issue on the GitHub repository.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**