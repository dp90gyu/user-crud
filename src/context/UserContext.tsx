import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { userService } from '../api/users';

// Type definitions
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

interface UserContextType {
  users: User[];
  loading: boolean;
  error: string | null;
  loadUsers: () => Promise<void>;
  addUser: (newUser: Omit<User, 'id'>) => User;
  updateUser: (updatedUser: User) => void;
  deleteUser: (userId: number) => void;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUsers = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nextId, setNextId] = useState<number>(11); // Start from 11 since API has 1-10

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getUsers();
      setUsers(data);
      // Find the highest ID from API users and set nextId accordingly
      const maxApiId = Math.max(...data.map(user => user.id));
      setNextId(maxApiId + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addUser = (newUser: Omit<User, 'id'>): User => {
    // Use the nextId and increment it
    const userWithId: User = { ...newUser, id: nextId };
    setUsers(prevUsers => [...prevUsers, userWithId]);
    setNextId(prevId => prevId + 1);
    return userWithId; // Return the user with the assigned ID
  };

  const updateUser = (updatedUser: User): void => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  };

  const deleteUser = (userId: number): void => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  const value: UserContextType = {
    users,
    loading,
    error,
    loadUsers,
    addUser,
    updateUser,
    deleteUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
