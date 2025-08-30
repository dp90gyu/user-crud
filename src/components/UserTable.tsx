import React from 'react';
import SkeletonLoader from './SkeletonLoader';
import './UserTable.css';

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

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
  onView: (user: User) => void;
  loading: boolean;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete, onView, loading }) => {
  // Helper function to generate avatar text
  const generateAvatarText = (name: string | undefined | null): string => {
    if (!name || typeof name !== 'string') return '?';
    
    const trimmedName = name.trim();
    if (trimmedName.length === 0) return '?';
    
    const firstChar = trimmedName.charAt(0);
    if (!firstChar || firstChar === ' ' || firstChar === '\t' || firstChar === '\n') return '?';
    
    // Check if it's a valid character
    if (firstChar.match(/[a-zA-Z0-9]/)) {
      return firstChar.toUpperCase();
    }
    
    // If it's a special character, try to find the first valid character
    for (let i = 1; i < trimmedName.length; i++) {
      const char = trimmedName.charAt(i);
      if (char.match(/[a-zA-Z0-9]/)) {
        return char.toUpperCase();
      }
    }
    
    return '?';
  };

  // Ensure avatar always has content
  const ensureAvatarContent = (avatarText: string): string => {
    return avatarText || '?';
  };
  if (loading) {
    return (
      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <SkeletonLoader type="table-row" count={5} />
          </tbody>
        </table>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="user-table-container">
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <h3>No Users Found</h3>
          <p>Start by adding your first user to the system.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            // Debug logging for avatar issues
            const avatarText = generateAvatarText(user.name);
            console.log('User data:', {
              id: user.id,
              name: user.name,
              nameType: typeof user.name,
              nameLength: user.name ? user.name.length : 0,
              trimmedName: user.name ? user.name.trim() : '',
              firstChar: user.name ? user.name.trim().charAt(0) : 'none',
              avatarText: avatarText
            });
            
            return (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                    <div 
                      className="user-avatar"
                      data-user-id={user.id}
                      data-user-name={user.name || 'no-name'}
                      data-avatar-text={generateAvatarText(user.name)}
                      title={`Avatar for ${user.name || 'Unnamed User'}`}
                    >
                      {ensureAvatarContent(generateAvatarText(user.name))}
                    </div>
                    <div className="user-details">
                      <div className="user-name">{user.name || 'Unnamed User'}</div>
                      <div className="user-email">{user.email || 'No email'}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <a href={`mailto:${user.email || '#'}`} className="user-email">
                    {user.email || 'No email'}
                  </a>
                </td>
                <td>
                  <span className="user-phone">{user.phone || 'No phone'}</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="action-btn btn-view"
                      onClick={() => onView(user)}
                      title="View User"
                    >
                      👁️
                    </button>
                    <button
                      className="action-btn btn-edit"
                      onClick={() => onEdit(user)}
                      title="Edit User"
                    >
                      ✏️
                    </button>
                    <button
                      className="action-btn btn-delete"
                      onClick={() => onDelete(user.id)}
                      title="Delete User"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
