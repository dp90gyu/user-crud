import React from 'react';
import './Spinner.css';

interface SpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

const Spinner: React.FC<SpinnerProps> = ({ message = 'Loading...', size = 'medium' }) => {
  return (
    <div className="spinner-container">
      <div className={`spinner ${size}`}></div>
      {message && <p className="spinner-message">{message}</p>}
    </div>
  );
};

export default Spinner;
