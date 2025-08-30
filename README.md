# User Management System

A comprehensive CRUD (Create, Read, Update, Delete) application built with React for managing users. This application demonstrates modern React development practices including functional components, hooks, routing, and API integration.

## Features

### ✅ Core CRUD Operations
- **Create**: Add new users with comprehensive form validation
- **Read**: Display users in a responsive table with detailed view
- **Update**: Edit existing user information with pre-filled forms
- **Delete**: Remove users with confirmation dialogs

### ✅ User Interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Loading States**: Skeleton screens and spinners for better UX
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Toast Notifications**: Real-time feedback for user actions

### ✅ Technical Features
- **React Router**: Client-side routing with nested routes
- **React Hooks**: useState, useEffect for state management
- **API Integration**: JSONPlaceholder API for data operations
- **Form Validation**: Client-side validation with error messages
- **Responsive Layout**: Mobile-first design approach

## Technology Stack

- **Frontend**: React 19.1.1
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Styling**: CSS3 with modern features
- **API**: JSONPlaceholder (https://jsonplaceholder.typicode.com/)

## Project Structure

```
src/
├── api/
│   └── users.js          # API service functions
├── components/
│   ├── Spinner.jsx       # Loading spinner component
│   ├── Spinner.css
│   ├── Toast.jsx         # Notification component
│   ├── Toast.css
│   ├── UserTable.jsx     # Users table component
│   └── UserTable.css
├── pages/
│   ├── UsersList.jsx     # Main users list page
│   ├── UsersList.css
│   ├── UserForm.jsx      # Create/Edit user form
│   ├── UserForm.css
│   ├── UserDetail.jsx    # User detail view
│   └── UserDetail.css
├── App.jsx               # Main application component
├── App.css               # Global styles
├── main.jsx              # Application entry point
└── index.css             # Base styles
```

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd user-crud
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Integration

The application uses the JSONPlaceholder API for demonstration purposes:

- **Base URL**: `https://jsonplaceholder.typicode.com`
- **Endpoints**:
  - `GET /users` - Fetch all users
  - `GET /users/:id` - Fetch single user
  - `POST /users` - Create new user
  - `PUT /users/:id` - Update user
  - `DELETE /users/:id` - Delete user

**Note**: JSONPlaceholder is a fake API for testing and prototyping. It doesn't actually persist data, but simulates real API responses.

## Features in Detail

### 1. Users List Page (`/users`)
- Displays all users in a responsive table
- Shows user statistics (total users, valid emails)
- Actions: Edit, Delete, View details
- Search and filter capabilities (can be extended)
- Loading states with skeleton screens

### 2. Create User (`/users/create`)
- Comprehensive form with validation
- Fields: Name, Email, Phone, Website, Company, Address
- Real-time validation feedback
- Responsive form layout

### 3. Edit User (`/users/edit/:id`)
- Pre-filled form with existing user data
- Same validation as create form
- Optimistic updates for better UX

### 4. User Detail (`/users/:id`)
- Detailed user profile view
- Contact information with clickable links
- Company and address information
- Actions: Edit, Delete, Back to list

## Responsive Design

The application is fully responsive with breakpoints:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

### Mobile Optimizations
- Collapsible table columns
- Stacked form layouts
- Touch-friendly buttons
- Optimized navigation

## Error Handling

- **Network Errors**: Graceful handling of API failures
- **Validation Errors**: Real-time form validation
- **404 Errors**: User-friendly error pages
- **Loading States**: Skeleton screens and spinners

## Performance Optimizations

- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Components loaded on demand
- **Optimized Images**: SVG icons and optimized assets
- **CSS Optimization**: Minimal, efficient styles

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for providing the fake API
- [React](https://reactjs.org/) for the amazing framework
- [Vite](https://vitejs.dev/) for the fast build tool
- [React Router](https://reactrouter.com/) for client-side routing

## Future Enhancements

- [ ] Search and filtering functionality
- [ ] Pagination for large datasets
- [ ] Bulk operations (delete multiple users)
- [ ] Export functionality (CSV, PDF)
- [ ] User authentication and authorization
- [ ] Dark mode theme
- [ ] Unit and integration tests
- [ ] TypeScript migration
- [ ] PWA capabilities
- [ ] Real-time updates with WebSocket

---

**Built with ❤️ using React and modern web technologies**
