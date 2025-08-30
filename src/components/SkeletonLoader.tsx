import React from 'react';
import './SkeletonLoader.css';

interface SkeletonLoaderProps {
  type: 'table-row' | 'card' | 'form' | 'profile';
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type, count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'table-row':
        return (
          <tr className="skeleton-row">
            <td className="skeleton-cell">
              <div className="user-info">
                <div className="skeleton-avatar"></div>
                <div className="user-details">
                  <div className="skeleton-text skeleton-text-long"></div>
                  <div className="skeleton-text skeleton-text-short"></div>
                </div>
              </div>
            </td>
            <td className="skeleton-cell">
              <div className="skeleton-text skeleton-text-medium"></div>
            </td>
            <td className="skeleton-cell">
              <div className="skeleton-text skeleton-text-medium"></div>
            </td>
            <td className="skeleton-cell">
              <div className="skeleton-actions">
                <div className="skeleton-action"></div>
                <div className="skeleton-action"></div>
                <div className="skeleton-action"></div>
              </div>
            </td>
          </tr>
        );

      case 'card':
        return (
          <div className="skeleton-card">
            <div className="skeleton-card-header">
              <div className="skeleton-avatar skeleton-avatar-large"></div>
              <div className="skeleton-card-title">
                <div className="skeleton-text skeleton-text-long"></div>
                <div className="skeleton-text skeleton-text-short"></div>
              </div>
            </div>
            <div className="skeleton-card-content">
              <div className="skeleton-text skeleton-text-medium"></div>
              <div className="skeleton-text skeleton-text-medium"></div>
              <div className="skeleton-text skeleton-text-short"></div>
            </div>
          </div>
        );

      case 'form':
        return (
          <div className="skeleton-form">
            <div className="skeleton-form-header">
              <div className="skeleton-text skeleton-text-long"></div>
              <div className="skeleton-text skeleton-text-medium"></div>
            </div>
            <div className="skeleton-form-fields">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="skeleton-form-field">
                  <div className="skeleton-label"></div>
                  <div className="skeleton-input"></div>
                </div>
              ))}
            </div>
            <div className="skeleton-form-actions">
              <div className="skeleton-button"></div>
              <div className="skeleton-button"></div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="skeleton-profile">
            <div className="skeleton-profile-header">
              <div className="skeleton-avatar skeleton-avatar-large"></div>
              <div className="skeleton-profile-info">
                <div className="skeleton-text skeleton-text-long"></div>
                <div className="skeleton-text skeleton-text-medium"></div>
                <div className="skeleton-text skeleton-text-medium"></div>
              </div>
            </div>
            <div className="skeleton-profile-sections">
              {[1, 2, 3].map((section) => (
                <div key={section} className="skeleton-section">
                  <div className="skeleton-section-title"></div>
                  <div className="skeleton-info-grid">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="skeleton-info-item">
                        <div className="skeleton-label"></div>
                        <div className="skeleton-text skeleton-text-medium"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <React.Fragment key={index}>
          {renderSkeleton()}
        </React.Fragment>
      ))}
    </>
  );
};

export default SkeletonLoader;
