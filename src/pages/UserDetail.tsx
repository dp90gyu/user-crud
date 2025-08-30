import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userService } from '../api/users';
import { useUsers } from '../context/UserContext';
import SkeletonLoader from '../components/SkeletonLoader';
import Toast from '../components/Toast';
import './UserDetail.css';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

interface ToastMessage {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { deleteUser } = useUsers();
  
  // State management
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Load user data on component mount
  useEffect(() => {
    if (id) {
      loadUser();
    }
  }, [id]);

  const loadUser = async (): Promise<void> => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getUserById(id);
      setUser(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user');
      showToast('Failed to load user: ' + (err instanceof Error ? err.message : 'Unknown error'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (): void => {
    if (id) {
      navigate(`/users/edit/${id}`);
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (!id) return;
    
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await userService.deleteUser(id);
      deleteUser(parseInt(id));
      showToast('User deleted successfully!', 'success');
      navigate('/users');
    } catch (err) {
      showToast('Failed to delete user: ' + (err instanceof Error ? err.message : 'Unknown error'), 'error');
    }
  };

  const handleBack = (): void => {
    navigate('/users');
  };

  const showToast = (message: string, type: ToastMessage['type'] = 'info'): void => {
    setToast({ message, type });
  };

  const closeToast = (): void => {
    setToast(null);
  };

  if (loading) {
    return (
      <div className="user-detail-container">
        <SkeletonLoader type="profile" count={1} />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="user-detail-container">
        <div className="error-state">
          <h2>User Not Found</h2>
          <p>{error || 'The requested user could not be found.'}</p>
          <button onClick={handleBack} className="btn btn-primary">
            ← Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-detail-container">
      <div className="page-header">
        <button onClick={handleBack} className="back-btn">
          ← Back to Users
        </button>
        <div className="header-actions">
          <button onClick={handleEdit} className="btn btn-edit">
            ✏️ Edit User
          </button>
          <button onClick={handleDelete} className="btn btn-delete">
            🗑️ Delete User
          </button>
        </div>
      </div>

      <div className="user-profile">
        <div className="profile-header">
          <div className="avatar">
            {user.name && user.name.trim() ? user.name.charAt(0).toUpperCase() : '?'}
          </div>
          <div className="profile-info">
            <h1>{user.name || 'Unnamed User'}</h1>
            <p className="user-email">{user.email || 'No email'}</p>
            <p className="user-phone">{user.phone || 'No phone'}</p>
          </div>
        </div>

        <div className="profile-sections">
          <div className="section">
            <h3>Contact Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Email</label>
                <a href={`mailto:${user.email}`} className="info-value">
                  {user.email}
                </a>
              </div>
              <div className="info-item">
                <label>Phone</label>
                <a href={`tel:${user.phone}`} className="info-value">
                  {user.phone}
                </a>
              </div>
              <div className="info-item">
                <label>Website</label>
                <a 
                  href={`https://${user.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="info-value"
                >
                  {user.website}
                </a>
              </div>
            </div>
          </div>

          <div className="section">
            <h3>Company Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Company Name</label>
                <span className="info-value">{user.company?.name || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>Catch Phrase</label>
                <span className="info-value">{user.company?.catchPhrase || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>Business</label>
                <span className="info-value">{user.company?.bs || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="section">
            <h3>Address Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Street</label>
                <span className="info-value">{user.address?.street || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>Suite</label>
                <span className="info-value">{user.address?.suite || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>City</label>
                <span className="info-value">{user.address?.city || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>Zip Code</label>
                <span className="info-value">{user.address?.zipcode || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>Coordinates</label>
                <span className="info-value">
                  {user.address?.geo?.lat && user.address?.geo?.lng 
                    ? `${user.address.geo.lat}, ${user.address.geo.lng}`
                    : 'N/A'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
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

export default UserDetail;
