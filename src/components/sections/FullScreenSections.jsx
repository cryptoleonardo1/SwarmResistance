import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const FullScreenSection = forwardRef(({ children, className = "", hasTopBar = true }, ref) => {
  return (
    <div 
      ref={ref}
      className={`min-h-screen w-full relative overflow-hidden ${className}`}
    >
      <div className={`section-content ${hasTopBar ? 'pt-16' : ''} h-full min-h-screen flex flex-col`}>
        {children}
      </div>
    </div>
  );
});

FullScreenSection.displayName = 'FullScreenSection';

FullScreenSection.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hasTopBar: PropTypes.bool
};

export default FullScreenSection;