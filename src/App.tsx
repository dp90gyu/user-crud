import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import UsersList from './pages/UsersList';
import UserForm from './pages/UserForm';
import UserDetail from './pages/UserDetail';
import './App.css';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <header className="app-header">
            <div className="header-content">
              <h1>User Management System</h1>
              <p>A comprehensive CRUD application for managing users</p>
            </div>
          </header>
          
          <main className="app-main">
            <Routes>
              {/* Redirect root to users list */}
              <Route path="/" element={<Navigate to="/users" replace />} />
              
              {/* Users list page */}
              <Route path="/users" element={<UsersList />} />
              
              {/* Create new user */}
              <Route path="/users/create" element={<UserForm />} />
              
              {/* Edit existing user */}
              <Route path="/users/edit/:id" element={<UserForm />} />
              
              {/* User detail page */}
              <Route path="/users/:id" element={<UserDetail />} />
              
              {/* Catch all route - redirect to users */}
              <Route path="*" element={<Navigate to="/users" replace />} />
            </Routes>
          </main>
          
          <footer className="app-footer">
            <p>Made By Divya Patle. Built with React and JSONPlaceholder API.</p>
          </footer>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
