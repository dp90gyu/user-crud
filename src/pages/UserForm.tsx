import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userService } from '../api/users';
import { useUsers } from '../context/UserContext';
import Spinner from '../components/Spinner';
import SkeletonLoader from '../components/SkeletonLoader';
import './UserForm.css';

interface UserFormData {
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

interface FormErrors {
  [key: string]: string;
}

const UserForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addUser, updateUser } = useUsers();
  const isEditing = Boolean(id);

  // Form state
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    },
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    }
  });

  // UI state
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Load user data if editing
  useEffect(() => {
    if (isEditing && id) {
      loadUser();
    }
  }, [id, isEditing]);

  const loadUser = async (): Promise<void> => {
    if (!id) return;
    
    setLoading(true);
    try {
      const user = await userService.getUserById(id);
      setFormData(user);
    } catch (error) {
      console.error('Error loading user:', error);
      alert('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    
    // Handle nested object updates
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof UserFormData] as any,
          [child]: value
        }
      } as UserFormData));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!formData.website.trim()) {
      newErrors.website = 'Website is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      if (isEditing && id) {
        // For editing, call API and update local state
        await userService.updateUser(id, formData);
        updateUser({ ...formData, id: parseInt(id) });
        alert('User updated successfully!');
      } else {
        // For creating, call API and add to local state
        await userService.createUser(formData);
        // Use the data from the form, not the API response
        addUser(formData);
        alert('User created successfully!');
      }
      navigate('/users');
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Failed to save user: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = (): void => {
    navigate('/users');
  };

  if (loading) {
    return (
      <div className="user-form-container">
        <SkeletonLoader type="form" count={1} />
      </div>
    );
  }

  return (
    <div className="user-form-container">
      <div className="form-header">
        <h2>{isEditing ? 'Edit User' : 'Create New User'}</h2>
        <p>{isEditing ? 'Update user information' : 'Add a new user to the system'}</p>
      </div>

      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-section">
          <h3>Basic Information</h3>
          
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter full name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter email address"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={errors.phone ? 'error' : ''}
              placeholder="Enter phone number"
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="website">Website *</label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className={errors.website ? 'error' : ''}
              placeholder="Enter website URL"
            />
            {errors.website && <span className="error-message">{errors.website}</span>}
          </div>
        </div>

        <div className="form-section">
          <h3>Company Information</h3>
          
          <div className="form-group">
            <label htmlFor="company.name">Company Name</label>
            <input
              type="text"
              id="company.name"
              name="company.name"
              value={formData.company.name}
              onChange={handleInputChange}
              placeholder="Enter company name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="company.catchPhrase">Catch Phrase</label>
            <input
              type="text"
              id="company.catchPhrase"
              name="company.catchPhrase"
              value={formData.company.catchPhrase}
              onChange={handleInputChange}
              placeholder="Enter company catch phrase"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Address Information</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="address.street">Street</label>
              <input
                type="text"
                id="address.street"
                name="address.street"
                value={formData.address.street}
                onChange={handleInputChange}
                placeholder="Enter street address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address.suite">Suite</label>
              <input
                type="text"
                id="address.suite"
                name="address.suite"
                value={formData.address.suite}
                onChange={handleInputChange}
                placeholder="Enter suite number"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="address.city">City</label>
              <input
                type="text"
                id="address.city"
                name="address.city"
                value={formData.address.city}
                onChange={handleInputChange}
                placeholder="Enter city"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address.zipcode">Zip Code</label>
              <input
                type="text"
                id="address.zipcode"
                name="address.zipcode"
                value={formData.address.zipcode}
                onChange={handleInputChange}
                placeholder="Enter zip code"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Spinner size="small" message="" />
                {isEditing ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              isEditing ? 'Update User' : 'Create User'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
