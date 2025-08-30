import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../context/UserContext';
import { userService } from '../api/users';
import UserTable from '../components/UserTable';
import Toast from '../components/Toast';
import './UsersList.css';

interface ToastMessage {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

const UsersList: React.FC = () => {
  const navigate = useNavigate();
  const { users, loading, error, deleteUser } = useUsers();
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const handleCreateUser = (): void => {
    navigate('/users/create');
  };

  const handleEditUser = (user: { id: number }): void => {
    navigate(`/users/edit/${user.id}`);
  };

  const handleDeleteUser = async (userId: number): Promise<void> => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      // Call the API (for simulation) but also update local state
      await userService.deleteUser(userId);
      deleteUser(userId);
      showToast('User deleted successfully!', 'success');
    } catch (err) {
      showToast('Failed to delete user: ' + (err instanceof Error ? err.message : 'Unknown error'), 'error');
    }
  };

  const handleViewUser = (user: { id: number }): void => {
    navigate(`/users/${user.id}`);
  };

  const showToast = (message: string, type: ToastMessage['type'] = 'info'): void => {
    setToast({ message, type });
  };

  const closeToast = (): void => {
    setToast(null);
  };

  const renderStatsBar = () => {
    if (loading) {
      return (
        <div className="stats-bar">
          <div className="stat-item">
            <div className="skeleton-text skeleton-text-short" style={{ height: '24px', width: '60px' }}></div>
            <div className="skeleton-text skeleton-text-short" style={{ height: '14px', width: '80px' }}></div>
          </div>
          <div className="stat-item">
            <div className="skeleton-text skeleton-text-short" style={{ height: '24px', width: '60px' }}></div>
            <div className="skeleton-text skeleton-text-short" style={{ height: '14px', width: '80px' }}></div>
          </div>
        </div>
      );
    }

    return (
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-number">{users.length}</span>
          <span className="stat-label">Total Users</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {users.filter(user => user.email.includes('@')).length}
          </span>
          <span className="stat-label">Valid Emails</span>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="users-list-container">
        <div className="page-header">
          <div className="header-content">
            <h1>Users Management</h1>
            <p>Manage your user database with full CRUD operations</p>
          </div>
          <div className="skeleton-button" style={{ height: '44px', width: '140px' }}></div>
        </div>

        <div className="content-section">
          {renderStatsBar()}
          <UserTable
            users={[]}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onView={handleViewUser}
            loading={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="users-list-container">
      <div className="page-header">
        <div className="header-content">
          <h1>Users Management</h1>
          <p>Manage your user database with full CRUD operations</p>
        </div>
        <button 
          className="btn btn-primary create-btn"
          onClick={handleCreateUser}
        >
          ➕ Add New User
        </button>
      </div>

      {error && (
        <div className="error-banner">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            🔄 Retry
          </button>
        </div>
      )}

      <div className="content-section">
        {renderStatsBar()}

        <UserTable
          users={users}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          onView={handleViewUser}
          loading={loading}
        />
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  );
};

export default UsersList;
