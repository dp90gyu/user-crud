import React from 'react';
import Spinner from './Spinner';
import SkeletonLoader from './SkeletonLoader';
import './LoadingState.css';

interface LoadingStateProps {
  type: 'spinner' | 'skeleton' | 'dots' | 'bars' | 'pulse';
  variant?: 'page' | 'section' | 'inline' | 'overlay';
  message?: string;
  size?: 'small' | 'medium' | 'large';
  skeletonType?: 'table-row' | 'card' | 'form' | 'profile';
  skeletonCount?: number;
  showShimmer?: boolean;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  type = 'spinner',
  variant = 'section',
  message = 'Loading...',
  size = 'medium',
  skeletonType = 'card',
  skeletonCount = 3,
  showShimmer = true
}) => {
  const renderLoadingContent = () => {
    switch (type) {
      case 'spinner':
        return (
          <div className={`loading-state loading-${variant}`}>
            <Spinner message={message} size={size} />
          </div>
        );

      case 'skeleton':
        return (
          <div className={`loading-state loading-${variant}`}>
            <SkeletonLoader type={skeletonType} count={skeletonCount} />
          </div>
        );

      case 'dots':
        return (
          <div className={`loading-state loading-${variant}`}>
            <div className="loading-dots">
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
            </div>
            {message && <p className="loading-message">{message}</p>}
          </div>
        );

      case 'bars':
        return (
          <div className={`loading-state loading-${variant}`}>
            <div className="loading-bars">
              <div className="loading-bar"></div>
              <div className="loading-bar"></div>
              <div className="loading-bar"></div>
              <div className="loading-bar"></div>
              <div className="loading-bar"></div>
            </div>
            {message && <p className="loading-message">{message}</p>}
          </div>
        );

      case 'pulse':
        return (
          <div className={`loading-state loading-${variant}`}>
            <div className="loading-pulse"></div>
            {message && <p className="loading-message">{message}</p>}
          </div>
        );

      default:
        return (
          <div className={`loading-state loading-${variant}`}>
            <Spinner message={message} size={size} />
          </div>
        );
    }
  };

  return (
    <div className={`loading-container ${showShimmer ? 'with-shimmer' : ''}`}>
      {renderLoadingContent()}
    </div>
  );
};

export default LoadingState;
