import React from 'react';
import './PageContainer.css';

interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function PageContainer({
  children,
  maxWidth = 'medium',
  className = '',
}: PageContainerProps) {
  return (
    <div className={`page-container ${className}`}>
      <div className={`page-content page-content-${maxWidth}`}>
        {children}
      </div>
    </div>
  );
}
